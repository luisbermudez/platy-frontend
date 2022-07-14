import { Link } from "react-router-dom";
import "./SignupOrLogin.css";

const SignupOrLogin = ({switchModal}) => {
  return (
    <div className="SignupOrLogin">
      <h2>Sign up to share</h2>
      <p>Start sharing cool videos and locations.</p>
      <Link to="/signup"><button onClick={switchModal}>Sign up</button></Link>
      <p>
        Already have an account? <Link to="/login" onClick={switchModal}>Log In</Link>
      </p>
    </div>
  );
};

export default SignupOrLogin;
