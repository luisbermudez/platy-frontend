import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TextInput, PasswordInput } from "../../components";
import { loginWs } from "../../services/auth-ws";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();

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
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const response = await loginWs(values);
            if (response.status) {
              navigate("/");
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
          <TextInput label="Email Address" name="email" type="email" />
          <PasswordInput label="Password" name="password" />

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginForm;
