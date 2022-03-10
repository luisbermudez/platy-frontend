import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { authVerify } from "../../redux/authSlice";

const CallAuthVerify = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authVerify());
  });

  return children;
};

export default CallAuthVerify;
