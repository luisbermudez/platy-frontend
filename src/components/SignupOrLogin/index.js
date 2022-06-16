import { Link } from "react-router-dom";
import "./SignupOrLogin.css";
import Platy from "../../Logo/platy";
import { PersonFill } from "react-bootstrap-icons";

const SignupOrLogin = () => {
  return (
    <div className="SignupOrLogin">
      <h2>Sign up to share</h2>
      <p>Start sharing cool videos and locations.</p>
      <Link to="/signup"><button>Sign up</button></Link>
      <p>
        Already have an account? <Link to="/login">Log In</Link>
      </p>
    </div>
  );
};

export default SignupOrLogin;
