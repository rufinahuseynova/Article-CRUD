import * as yup from "yup";

const userSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  gender: yup
    .string()
    .oneOf(["female", "male"], "Please select a valid gender")
    .required("Gender is required"),
  status: yup
    .string()
    .oneOf(["active", "inactive"], "Please select a valid status")
    .required("Status is required"),
});

export default userSchema;
