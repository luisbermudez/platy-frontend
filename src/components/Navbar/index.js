import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  PlusCircle,
  Person,
  PersonFill,
  GeoAlt,
  GeoAltFill,
  House,
  HouseFill,
} from "react-bootstrap-icons";
import { Modal } from "react-bootstrap";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import "./Navbar.css";
import Platy from "../../Logo/platy.js";
import SignupOrLogin from "../SignupOrLogin";

function Navbar() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);
  const { pathname } = useLocation();
  const [show, setShow] = useState(false);

  const switchModal = () => setShow(!show);

  return (
    <nav className="Navbar">
      <Modal
        show={show}
        animation={false}
        centered
        className="MapAddLocations-modal"
      >
        <div className="modal-container">
          <p onClick={switchModal} className="goback">
            x
          </p>
          <SignupOrLogin switchModal={switchModal} />
        </div>
      </Modal>
      <div className="platy-nav-container">
        <Link to="/">
          <Platy />
        </Link>
      </div>
      <div className="searchbar-nav-container"></div>
      <div className="profile-container">
        <Link className="icon-ind-container" to="/">
          {pathname == "/" ? <HouseFill /> : <House />}
        </Link>
        <Link className="icon-ind-container" to="/map">
          {pathname == "/map" ? <GeoAltFill /> : <GeoAlt />}
        </Link>

        {isLoggedIn ? (
          <Link className="icon-ind-container" to="/add-location">
            <PlusCircle />
          </Link>
        ) : (
          <a className="icon-ind-container">
            <PlusCircle onClick={switchModal} />
          </a>
        )}

        {isLoggedIn ? (
          <Link to="/profile" className="icon-ind-container">
            <img
              className="nav-avatar"
              alt="profile"
              src={user.profilePicture}
            />
          </Link>
        ) : (
          <Link className="icon-ind-container" to="/login">
            {pathname == "/login" ? (
              <PersonFill />
            ) : pathname == "/signup" ? (
              <PersonFill />
            ) : (
              <Person />
            )}
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
