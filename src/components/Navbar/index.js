import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <nav>
      <Link to="/">Home | </Link>

      {isLoggedIn ? (
        <>
          <Link to="/profile">Profile</Link>
        </>
      ) : (
        <>
          <Link to="/signup">Sign Up | </Link>
          <Link to="/login">Log In</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
