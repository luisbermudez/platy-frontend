import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TextInput, PasswordInput } from "../../components";
import { Link, useNavigate } from "react-router-dom";
import { loginWs } from "../../services/auth-ws";
import { useState } from "react";
import "./LoginForm.css";
import { ExclamationCircle } from "react-bootstrap-icons";

const LoginForm = () => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(null);

  const handleSubmit = async (values) => {
    setLoginError(null);
    try {
      const { errorMessage, status } = await loginWs(values);
      if (status) {
        navigate("/");
      } else {
        setLoginError(errorMessage);
      }
    } catch (error) {
      setLoginError("There has been an internal server error.");
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
          onSubmit={(values) => handleSubmit(values)}
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
