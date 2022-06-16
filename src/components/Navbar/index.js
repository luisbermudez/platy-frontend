import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  PlusCircle,
  Person,
  GeoAlt,
  GeoAltFill,
  House,
  HouseFill,
} from "react-bootstrap-icons";
import "./Navbar.css";
import Platy from "../../Logo/platy.js";

function Navbar() {
  const currentPage = useSelector((state) => state.videolocation.currentPage);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);

  const pageSelected = (page, element) => (page === element ? true : false);

  return (
    <nav className="Navbar">
      <div className="platy-nav-container">
        <Link to="/">
          <Platy />
        </Link>
      </div>
      <div className="searchbar-nav-container"></div>
      <div className="profile-container">
        <Link className="icon-ind-container" to="/discover">
          {pageSelected(currentPage, "discover") ? <HouseFill /> : <House />}
        </Link>
        <Link className="icon-ind-container" to="/map">
          {pageSelected(currentPage, "map") ? <GeoAltFill /> : <GeoAlt />}
        </Link>
        <Link className="icon-ind-container" to="/add-location">
          <PlusCircle />
        </Link>
        {isLoggedIn && (
          <Link to="/profile" className="icon-ind-container">
            <img
              className="nav-avatar"
              alt="profile"
              src={user.profilePicture}
            />
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
