import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function IsAnon({ children }) {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  if (isLoggedIn) {
    return <Navigate to="/" />;
  } else {
    return children;
  }
}

export default IsAnon;
