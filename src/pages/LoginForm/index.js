import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TextInput, PasswordInput } from "../../components";
import { Link, useNavigate } from "react-router-dom";
import { loginWs } from "../../services/auth-ws";
import { useState } from "react";

const LoginForm = () => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(null);

  const handleSubmit = async (values) => {
    try {
      const res = await loginWs(values);
      const { errorMessage, status } = res;
      if (status) {
        navigate("/");
      } else {
        setLoginError(errorMessage);
      }
    } catch (error) {
      // evetually, add some general error handler
      console.log(error);
    }
  };

  return (
    <div className="formContainer">
      <h1>Log In</h1>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Enter a valid email address")
            .required("This field is required."),
          password: Yup.string()
            .matches(
              /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/,
              "Password must be at least 6 characters long and contain at least, one number, one lowercase and one uppercase."
            )
            .required("This field is required."),
        })}
        onSubmit={async (values) => {
          handleSubmit(values);
        }}
      >
        <Form autoComplete="off">
          <TextInput label="Email Address" name="email" type="email" />
          <PasswordInput label="Password" name="password" />

          <button type="submit">Submit</button>
        </Form>
      </Formik>
      {loginError && <h4>{loginError}</h4>}
      <br />
      <br />
      <p>
        Don't have an account yet? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
};

export default LoginForm;
