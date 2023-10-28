import * as yup from "yup";

const signInValidationSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),

  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    // TODO: Remove the below regex check because it's sign in page and cause negative UX for the user
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
});

export default signInValidationSchema;
