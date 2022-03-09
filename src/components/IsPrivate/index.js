import { authverifyProcess } from "../../redux/UserDuck";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";

function IsPrivate({ children }) {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(authverifyProcess());
  });

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  } else {
    return children;
  }
}

export default IsPrivate;
