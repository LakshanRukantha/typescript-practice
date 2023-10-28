import * as yup from "yup";

const validateEmailExists = async (email: string) => {
  // Check if email exists in DB
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

const nameRegex = /^[a-zA-Z]+$/;

const signUpValidationSchema = yup.object().shape({
  firstName: yup
    .string()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters")
    .max(20, "First name can be at most 25 characters")
    .test(
      "letters-only",
      "First name must consist of letters only.",
      (value) => {
        return nameRegex.test(value);
      }
    ),

  lastName: yup
    .string()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters")
    .max(20, "Last name can be at most 25 characters")
    .test(
      "letters-only",
      "Last name must consist of letters only.",
      (value) => {
        return nameRegex.test(value);
      }
    ),

  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format")
    .test("is-valid-email", "Invalid email format", (value) => {
      const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
      return emailRegex.test(value);
    })
    .test("email-exist", "Email already exists", async (email: string) => {
      return !(await validateEmailExists(email)) as boolean; // Check email on every key change event. TODO: Remove this check and handle it in backend in future for better UX and security
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
