import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TextInput, PasswordInput } from "../../components";
import { signupWs } from "../../services/auth-ws";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { ExclamationCircle } from "react-bootstrap-icons";

const SignupForm = () => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(null);

  return (
    <div className="SignupForm">
      <div className="formContainer signupForm">
        <h1>Sign Up</h1>
        {loginError && (
          <p className="loginSignupToaster">
            <ExclamationCircle />
            {loginError}
          </p>
        )}
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
              .oneOf([Yup.ref("password"), null], "Passwords doesn't match")
              .required("This field is required."),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            setLoginError(null);
            try {
              const { errorMessage, status } = await signupWs(values);
              if (status) {
                navigate("/login");
                return;
              } else {
                setLoginError(errorMessage);
              }
            } catch (error) {
              setLoginError("Server error");
            }
          }}
        >
          <Form autoComplete="off">
            <TextInput label="First Name" name="name" type="text" />
            <TextInput label="Email Address" name="email" type="email" />
            <PasswordInput label="Password" name="password" />
            <PasswordInput label="Confirm Password" name="confirmPassword" />

            <button type="submit">Sign up</button>
          </Form>
        </Formik>
        <p>
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
