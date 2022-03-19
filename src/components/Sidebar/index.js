import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Map,
  GeoAlt,
  Heart,
  CalendarEvent,
  Compass,
} from "react-bootstrap-icons";
import "./Sidebar.css";

function Sidebar() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <nav className="sidebar">
      <div>
        <Map />
        <Link to="/map">Map</Link>
      </div>
      <div>
        <Compass />
        <Link to="/discover">Discover</Link>
      </div>

      {isLoggedIn && (
        <>
          <div>
            <GeoAlt />
            <Link to="/mylocations">My Locations</Link>
          </div>
          <div>
            <Heart />
            <Link to="/favorites">Favorites</Link>
          </div>
        </>
      )}
      <div>
        <CalendarEvent />
        <Link to="/events">Events</Link>
      </div>
    </nav>
  );
}

export default Sidebar;
