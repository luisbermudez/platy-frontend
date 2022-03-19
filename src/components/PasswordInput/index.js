import { useField } from "formik";
import { useState } from "react";
import { Eye, EyeSlash } from "react-bootstrap-icons";

const PasswordInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="PasswordInput">
      <label htmlFor={props.id || props.name}>{label}</label>
      <input
        id={props.name}
        className="text-input"
        {...field}
        {...props}
        type={showPassword ? "text" : "password"}
      />
      <label
        htmlFor={props.name}
        className="showPassword"
        onClick={() => {
          setShowPassword(showPassword ? false : true);
        }}
      >
        {showPassword ? (
          <Eye className="Eye-EyeLash" />
        ) : (
          <EyeSlash className="Eye-EyeLash" />
        )}
      </label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default PasswordInput;
