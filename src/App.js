import "./App.css";
import { useEffect, useRef, useState } from "react";
import { authverifyProcess } from "./redux/UserDuck";
import { useDispatch } from "react-redux";
import { Navbar, Sidebar } from "./components";
import RootNavigation from "./RootNavigation";

function App() {
  const dispatch = useDispatch();
  const hasVerified = useRef(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!hasVerified.current) {
      dispatch(authverifyProcess());
      hasVerified.current = true;
    }
  });

  useEffect(() => {
    const id = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => {
      clearTimeout(id);
    };
  });

  return (
    <div className="App">
      {loading ? (
        <h2>Loading ...</h2>
      ) : (
        <>
          <Navbar />
          <Sidebar />
          <RootNavigation />
        </>
      )}
    </div>
  );
}

export default App;
