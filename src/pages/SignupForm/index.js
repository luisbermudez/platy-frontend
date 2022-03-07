import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TextInput, PasswordInput } from "../../components";
import { signupWs } from "../../services/auth-ws";
import { useNavigate, Link } from "react-router-dom";

const SignupForm = () => {
  const navigate = useNavigate();
  return (
    <div className="formContainer">
      <h1>Sign Up</h1>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .max(15, "Must be 15 characteres or less")
            .required("This field is required."),
          email: Yup.string()
            .email("Enter a valid email address")
            .required("This field is required."),
          password: Yup.string()
            .matches(
              /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/,
              "Password must be at least 6 characters long and contain at least, one number, one lowercase and one uppercase."
            )
            .required("This field is required."),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("This field is required."),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const response = await signupWs(values);
            if (response.status) {
              navigate("/login");
            } else {
              // create a toaster
              console.log(response);
            }
          } catch (error) {
            console.log(error);
          }
        }}
      >
        <Form autoComplete="off">
          <TextInput label="Name" name="name" type="text" />
          <TextInput label="Email Address" name="email" type="email" />
          <PasswordInput label="Password" name="password" />
          <PasswordInput label="Confirm Password" name="confirmPassword" />

          <button type="submit">Submit</button>
        </Form>
      </Formik>
      <p>
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </div>
  );
};

export default SignupForm;
