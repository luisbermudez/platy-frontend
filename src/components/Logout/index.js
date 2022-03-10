import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return <button onClick={() => dispatch(logout(navigate))}>Logout</button>;
};

export default Logout;
