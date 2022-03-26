import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";
import { BoxArrowRight } from "react-bootstrap-icons";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <button className="logout_button" onClick={handleLogout}>
      <BoxArrowRight />
      Logout
    </button>
  );
};

export default Logout;
