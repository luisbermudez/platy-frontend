import { logoutWs } from "../../services/auth-ws";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const logoutExecute = async () => {
    try {
      const res = await logoutWs();
      if (res.status) {
        navigate("/");
      } else {
        // Toaster
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button onClick={logoutExecute}>Logout</button>
    </div>
  );
};

export default Logout;
