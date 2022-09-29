import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function IsPrivate({ children }) {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  // return <Navigate to="/login" />;
  // return children;

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  } else {
    return children;
  }
}

export default IsPrivate;
