import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Plus, PersonFill } from "react-bootstrap-icons";
import "./Navbar.css";
import Platy from "./platy.js";

function Navbar() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);

  return (
    <nav className="Navbar">
      <div className="platy-nav-container">
        <Link className="platy" to="/">
          <Platy />
        </Link>
      </div>
      <div className="searchbar-nav-container"></div>
      <div className="profile-container">
        <div className="share-flow">
          <Plus className="ShareSvg" />
          <Link to="/add-location">Share your flow</Link>
        </div>
        {isLoggedIn ? (
          <>
            <Link to="/profile" className="profileLink">
              <img
                className="nav-avatar"
                alt="profile"
                src={user.profilePicture}
              />
              <button>{user.name}</button>
            </Link>
          </>
        ) : (
          <>
            <Link to="/login">
              <button className="login">
                <PersonFill className="PersonFill-Nav" />
                Log In
              </button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

// <Dropdown>
//   <Dropdown.Toggle className="DropdownToggle-Nav">
//     <Person className="PersonFill-Nav" />
//   </Dropdown.Toggle>
//   <Dropdown.Menu>
//     <Dropdown.Item as={Link} to="/signup">
//       Sign Up
//     </Dropdown.Item>
//     <Dropdown.Item as={Link} to="/login">
//       Log In
//     </Dropdown.Item>
//   </Dropdown.Menu>
// </Dropdown>;
