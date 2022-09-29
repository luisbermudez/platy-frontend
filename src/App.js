import "./App.css";
import { useEffect, useState, useRef } from "react";
import { Navbar, NewPostNavbar } from "./components";
import RootNavigation from "./RootNavigation";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authVerify } from "./redux/authSlice";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const authenticatedState = useSelector((state) => state.auth.authenticated);
  const hasAuthenticate = useRef(false);

  // Simulates the loading process of the videolocations but also ** makes it so other pages have
  // time to load resourcer NEEDS TO BE FIXED
  // useEffect(() => {
  //   const id = setTimeout(() => {
  //     setLoading(false);
  //   }, 2e3);
  //   return () => {
  //     clearTimeout(id);
  //   };
  // }, []);

  // Recreate user state on page refresh or navigate after authentication
  useEffect(() => {
    if (!hasAuthenticate.current) {
      const navType = window.performance.getEntriesByType("navigation")[0].type;
      const getType =
        navType === "reload" ? true : navType === "navigate" ? true : false;

      if (getType) {
        dispatch(authVerify());
        hasAuthenticate.current = true;
      }
    }
  });

  // Wait for user authentication
  useEffect(() => {
    if (authenticatedState) {
      setLoading(false);
    }
  }, [authenticatedState]);

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
