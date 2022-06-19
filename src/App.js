import "./App.css";
import { useDispatch } from "react-redux";
import { authVerify } from "./redux/authSlice";
import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Navbar } from "./components";
import RootNavigation from "./RootNavigation";

function App() {
  const [loading, setLoading] = useState(true);
  const hasVerified = useRef(false);
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    if (!hasVerified.current) {
      dispatch(authVerify());
      hasVerified.current = true;
    }
  });

  useEffect(() => {
    const id = setTimeout(() => {
      setLoading(false);
    }, 1e3);
    return () => {
      clearTimeout(id);
    };
  }, []);

  return (
    <div className="App">
      {loading ? (
        <h2 className="mainLoading">Loading ...</h2>
      ) : (
        <>
          {/* {pathname == "/signup" ? null : pathname == "/login" ? null : <Navbar />} */}
          <Navbar />
          <div className="app-container">
            <RootNavigation />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
