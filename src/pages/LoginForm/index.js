import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TextInput, PasswordInput } from "../../components";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { loginWs } from "../../services/auth-ws";
import { useState } from "react";
import "./LoginForm.css";
import { ExclamationCircle } from "react-bootstrap-icons";

const LoginForm = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [loginError, setLoginError] = useState(null);

  const handleSubmit = async (values) => {
    setLoginError(null);
    try {
      const res = await loginWs(values);
      const { errorMessage, status } = res;
      if (status) {
        pathname === "/login" ? navigate("/") : window.location.reload(false);
      } else {
        setLoginError(errorMessage);
      }
    } catch (error) {
      setLoginError("Server error: ");
    }
  };

  return (
    <div className="LoginForm">
      <div className="formContainer">
        <h2>Log in</h2>
        {loginError && (
          <p className="loginSignupToaster">
            <ExclamationCircle />
            {loginError}
          </p>
        )}
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Enter a valid email address")
              .required("This field is required."),
            password: Yup.string().required("This field is required."),
          })}
          onSubmit={async (values) => {
            handleSubmit(values);
          }}
        >
          <Form autoComplete="off">
            <TextInput label="Email Address" name="email" type="email" />
            <PasswordInput label="Password" name="password" />

            <button type="submit">Log in</button>
          </Form>
        </Formik>
        <p>
          Don't have an account yet? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
