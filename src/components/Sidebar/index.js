import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { GeoAlt, Compass } from "react-bootstrap-icons";
import "./Sidebar.css";

function Sidebar() {
  const currentPage = useSelector((state) => state.videolocation.currentPage);
  const discover = useRef(null);
  const map = useRef(null);

  const handlePageSelector = (currentPageValue) => {
    switch (currentPageValue) {
      case "discover":
        discover.current.className = "activeLink";
        map.current.className = "sidebarLink";
        break;
      case "map":
        map.current.className = "activeLink";
        discover.current.className = "sidebarLink";
        break;
      default:
        map.current.className = "sidebarLink";
        discover.current.className = "sidebarLink";
    }
  };

  useEffect(() => {
    handlePageSelector(currentPage);
  }, [currentPage]);

  return (
    <nav className="sidebar">
      <div className="sidebarOption">
        <Link ref={discover} className="sidebarLink" to="/discover">
          <Compass />
          Discover
        </Link>
      </div>
      <div className="sidebarOption">
        <Link ref={map} className="sidebarLink" to="/map">
          <GeoAlt />
          Map
        </Link>
      </div>
    </nav>
  );
}

export default Sidebar;
