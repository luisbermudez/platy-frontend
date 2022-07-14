import "./App.css";
import { useDispatch } from "react-redux";
import { authVerify } from "./redux/authSlice";
import { useEffect, useState, useRef } from "react";
import { Navbar, NewPostNavbar } from "./components";
import RootNavigation from "./RootNavigation";
import { useLocation } from "react-router-dom";

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
          <div className="navbar-container">
            {pathname == "/add-location" ? (
              <NewPostNavbar />
            ) : pathname == "/add-location-2" ? (
              <NewPostNavbar />
            ) : (
              <Navbar />
            )}
          </div>

          <div className="app-container">
            <RootNavigation />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
