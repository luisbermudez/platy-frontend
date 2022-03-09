import { authverifyProcess } from "../../redux/UserDuck";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const CallAuthVerify = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(authverifyProcess());
  });

  return children;
};

export default CallAuthVerify;
