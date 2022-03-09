import { authverifyProcess } from "../../redux/UserDuck";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";

function IsAnon({ children }) {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(authverifyProcess());
  });
  
  if (isLoggedIn) {
    return <Navigate to="/" />;
  } else {
    return children;
  }
}

export default IsAnon;
