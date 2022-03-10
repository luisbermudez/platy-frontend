import { useDispatch, useSelector } from "react-redux";
import { authVerify } from "../../redux/authSlice";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";

function IsPrivate({ children }) {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authVerify());
  });

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  } else {
    return children;
  }
}

export default IsPrivate;
