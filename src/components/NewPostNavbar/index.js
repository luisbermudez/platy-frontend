import "./NewPostNavbar.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { XLg, ChevronLeft } from "react-bootstrap-icons";
import { useSelector } from "react-redux";
import {
  clearCoordinates,
  clearVideoForNewPost,
  setPostLocation,
  toggleEditingLocationStatus,
} from "../../redux/videolocationSlice";
import { useLocation } from "react-router-dom";
import { removeVideoFromCloudinary } from "../../services/videolocation-ws";
import axios from "axios";

const NewPostNavbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const coordinates = useSelector((state) => state.videolocation.coordinates);
  const post = useSelector((state) => state.videolocation.videoForNewPost);
  const editingLocation = useSelector(
    (state) => state.videolocation.editingLocation
  );

  const cancelPost = async () => {
    try {
      if (post) {
        if (post.public_id) {
          await removeVideoFromCloudinary({
            public_id: post.public_id,
          });
        }
        dispatch(clearVideoForNewPost());
      }
    } catch (error) {
      dispatch(clearVideoForNewPost());
    }

    dispatch(clearCoordinates());
    return navigate("/");
  };

  const handleReverseGeocoding = async () => {
    try {
      const res = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${coordinates.lng},${coordinates.lat}.json?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`
      );
      console.log(res.data.features[0].place_name);
      dispatch(setPostLocation(res.data.features[0].place_name));
    } catch (error) {}
    return navigate("/add-location-2");
  };

  return (
    <nav className="NewPostNavbar">
      <div>
        {pathname == "/add-location" ? (
          <XLg onClick={cancelPost} />
        ) : (
          !editingLocation && <ChevronLeft onClick={() => navigate(-1)} />
        )}
      </div>
      <div>
        {pathname == "/add-location" ? (
          <p>Drop a pin</p>
        ) : editingLocation ? (
          <p>Edit location</p>
        ) : (
          <p>Add a video</p>
        )}
      </div>
      <div>
        {pathname == "/add-location" ? (
          coordinates && <p onClick={handleReverseGeocoding}>Next</p>
        ) : editingLocation ? (
          <button
            form="new-post-form"
            onClick={() => {
              handleReverseGeocoding();
              dispatch(toggleEditingLocationStatus());
            }}
          >
            Done
          </button>
        ) : (
          post && (
            <button form="new-post-form" type="submit">
              Share
            </button>
          )
        )}
      </div>
    </nav>
  );
};

export default NewPostNavbar;
