import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  PlusCircle,
  Person,
  PersonFill,
  GeoAlt,
  GeoAltFill,
  House,
  HouseFill,
  CameraReels,
} from "react-bootstrap-icons";
import { Modal, DropdownButton, Dropdown } from "react-bootstrap";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";
import Platy from "../../Logo/platy.js";
import SignupOrLogin from "../SignupOrLogin";
import {
  clearVideoForNewPost,
  clearCoordinates,
} from "../../redux/videolocationSlice";
import placeholderProfilePic from "../../Black-Dog-PNG.png";

function Navbar() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const [show, setShow] = useState(false);

  const switchModal = () => setShow(!show);

  const newPost = () => {
    dispatch(clearVideoForNewPost());
    dispatch(clearCoordinates());
    navigate("/add-location");
  };

  return (
    <nav className="Navbar">
      <Modal
        show={show}
        animation={false}
        centered
        className="small-modal singuplogin-modal"
        onHide={() => setShow(false)}
      >
        <div>
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
          <DropdownButton
            title={
              <Link className="icon-ind-container" to="#">
                <PlusCircle />
              </Link>
            }
          >
            <Dropdown.Item onClick={newPost}>
              Post <CameraReels />
            </Dropdown.Item>
          </DropdownButton>
        ) : (
          <Link className="icon-ind-container" to="#">
            <PlusCircle onClick={() => setShow(true)} />
          </Link>
        )}

        {isLoggedIn ? (
          <Link to="/profile" className="icon-ind-container">
            <img
              className="nav-avatar"
              alt="profile"
              // src={user.profilePicture}
              src={placeholderProfilePic}
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
