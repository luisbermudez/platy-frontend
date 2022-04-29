import { useSelector, useDispatch } from "react-redux";
import { authVerify } from "../../redux/authSlice";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";

function IsAnon({ children }) {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authVerify());
  });

  if (isLoggedIn) {
    return <Navigate to="/" />;
  } else {
    return children;
  }
}

export default IsAnon;
