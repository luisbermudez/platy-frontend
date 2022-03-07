import { useNavigate } from "react-router-dom";
import { logoutProcess } from "../../redux/UserDuck";
import { useDispatch } from "react-redux";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutExecute = () => {
    dispatch(logoutProcess(navigate));
  };

  return (
    <>
      <button onClick={logoutExecute}>Logout</button>
    </>
  );
};

export default Logout;
