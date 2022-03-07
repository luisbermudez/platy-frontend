import "./App.css";
import { useEffect, useRef } from "react";
import { authverifyProcess } from "./redux/UserDuck";
import { useDispatch, useSelector } from "react-redux";
import { Navbar, Sidebar } from "./components";
import RootNavigation from "./RootNavigation";

function App() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.user.loading);
  const hasVerified = useRef(false);

  useEffect(() => {
    if(!hasVerified.current) {
      dispatch(authverifyProcess());
      hasVerified.current = true;
    }
  });

  return (
    <div className="App">
      {!loading && (
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
