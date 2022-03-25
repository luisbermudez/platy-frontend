import "./App.css";
import { useDispatch } from "react-redux";
import { authVerify } from "./redux/authSlice";
import { useEffect, useState, useRef } from "react";
import { Navbar, Sidebar } from "./components";
import RootNavigation from "./RootNavigation";

function App() {
  const [loading, setLoading] = useState(true);
  const hasVerified = useRef(false);
  const dispatch = useDispatch();

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
          <Navbar />
          <div className="sidebar-rootnav-container">
            <div className="sidebar-container" sm={1}>
              <Sidebar />
            </div>
            <div className="rootnav-container" sm={11}>
              <RootNavigation />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
