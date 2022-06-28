import "./NewPostNavbar.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { XLg, ChevronLeft } from "react-bootstrap-icons";
import { useSelector } from "react-redux";
import { setCoordinates } from "../../redux/videolocationSlice";
import { useLocation } from "react-router-dom";
import { removeVideoFromCloudinary } from "../../services/videolocation-ws";

const NewPostNavbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const coordinates = useSelector((state) => state.videolocation.coordinates);
  const post = useSelector((state) => state.videolocation.videoForNewPost);

  const cancelPost = async () => {
    try {
      dispatch(setCoordinates(null));
      const { status, data, errorMessage } = await removeVideoFromCloudinary({
        public_id: post.publicId,
      });
      
      if (status) {
        navigate("/");
      }
    } catch (error) {
      dispatch(setCoordinates(null));
      navigate("/");
    }
  };

  return (
    <nav className="NewPostNavbar">
      <div>
        {pathname == "/add-location" ? (
          <XLg onClick={cancelPost} />
        ) : (
          <ChevronLeft onClick={() => navigate(-1)} />
        )}
      </div>
      <div>
        {pathname == "/add-location" ? <p>Drop a pin</p> : <p>Add a video</p>}
      </div>
      <div>
        {pathname == "/add-location"
          ? coordinates && (
              <p onClick={() => navigate("/add-location-2")}>Next</p>
            )
          : post.readyToShare && (
              <button form="new-post-form" type="submit">
                Share
              </button>
            )}
      </div>
    </nav>
  );
};

export default NewPostNavbar;
