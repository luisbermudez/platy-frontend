import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Sidebar() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <nav>
      <Link to="/map">Map | </Link>
      <Link to="/discover">Discover | </Link>
      <Link to="/add-location">Add Location | </Link>

      {isLoggedIn && (
        <>
          <Link to="/mylocations">My Locations | </Link>
          <Link to="/favorites">Favorites</Link>
        </>
      )}

      {/* <Link to="/events">Events</Link> */}
    </nav>
  );
}

export default Sidebar;
