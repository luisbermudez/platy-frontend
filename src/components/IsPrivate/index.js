import { authverifyProcess } from "../../redux/UserDuck";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useRef, useEffect } from "react";

function IsPrivate({ children }) {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const hasVerified = useRef(false);
  const dispatch = useDispatch();

  useEffect(() => {
    // if (!hasVerified.current) {
      dispatch(authverifyProcess());
      // hasVerified.current = true;
  //   }
  });

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  } else {
    return children;
  }
}

export default IsPrivate;
