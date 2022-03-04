import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav>
            <Link to="/">Home | </Link>
            <Link to="/signup">Sign Up | </Link>
            <Link to="/login">Log In | </Link>
            <Link to="/logout">Log Out</Link>
        </nav>
    )
}

export default Navbar;