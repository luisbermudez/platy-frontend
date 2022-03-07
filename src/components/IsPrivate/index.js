import { useEffect, useRef } from "react";
import { authverifyProcess } from "../../redux/UserDuck";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function IsPrivate({ children }) {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const loading = useSelector((state) => state.user.loading);
  const dispatch = useDispatch();
  const hasVerified = useRef(false);

  useEffect(() => {
    if (!hasVerified.current) {
      dispatch(authverifyProcess());
      hasVerified.current = true;
    }
  });

  if (loading) return;

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  } else {
    return children;
  }
}

export default IsPrivate;
