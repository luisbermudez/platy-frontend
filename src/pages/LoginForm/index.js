import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TextInput, PasswordInput } from "../../components";
import { Link, useNavigate } from "react-router-dom";
import { loginProcess, cleanLoginErrorProcess } from "../../redux/UserDuck";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginError = useSelector((state) => state.user.loginError);
  const errorDisplayed = useRef(false);

  useEffect(() => () => {
    if (!errorDisplayed.current) {
      dispatch(cleanLoginErrorProcess());
      errorDisplayed.current = true;
    }
  });

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
        onSubmit={(values, { setSubmitting }) => {
          dispatch(loginProcess(values, navigate));
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
