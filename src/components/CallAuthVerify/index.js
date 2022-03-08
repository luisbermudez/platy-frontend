import { authverifyProcess } from "../../redux/UserDuck";
import { useDispatch } from "react-redux";
import { useRef, useEffect } from "react";

const CallAuthVerify = ({ children }) => {
  const hasVerified = useRef(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!hasVerified.current) {
      dispatch(authverifyProcess());
      hasVerified.current = true;
    }
  });

  return children;
};

export default CallAuthVerify;
