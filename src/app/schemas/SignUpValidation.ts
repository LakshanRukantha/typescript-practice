import * as yup from "yup";

const validateEmailExists = async (email: string) => {
  if (email) {
    const response = await fetch("/api/emailExists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const { exist } = await response.json();

    if (exist) {
      return true; // Email exists
    }
    return false; // Email does not exist
  }
};

const signUpValidationSchema = yup.object().shape({
  firstName: yup
    .string()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name can be at most 25 characters"),

  lastName: yup
    .string()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name can be at most 25 characters"),

  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format")
    .test("email", "Email already exists", async (email: string) => {
      return !(await validateEmailExists(email)) as boolean;
    }),

  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),

  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

export default signUpValidationSchema;
