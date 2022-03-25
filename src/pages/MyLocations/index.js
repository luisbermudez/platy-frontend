import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { currentUserVideolocationCall } from "../../redux/videolocationSlice";
// import VideolocationModalDetails from "../../components/VideolocationModalDetails";
import { useNavigate } from "react-router-dom";
import "./MyLocations.css";
import { Pencil } from "react-bootstrap-icons";

const MyLocations = () => {
  const user = useSelector((state) => state.auth.user);
  const currentUserVideolocations = useSelector(
    (state) => state.videolocation.currentUserVideolocations
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const hasVerified = useRef(false);

  useEffect(() => {
    if (!hasVerified.current) {
      dispatch(currentUserVideolocationCall(user));
      hasVerified.current = true;
    }
  });

  return (
    <div className="MyLocations">
      <h1>My Locations</h1>
      <div className="MyLocations-videos-container">
        {currentUserVideolocations &&
          currentUserVideolocations.map((e) => (
            <div key={e._id}>
              <div className="MyLocations-video-container">
                <video src={e.videoUrl} />
              </div>
              <div className="MyLocation-information-container">
                <div>
                  <h6>
                    {e.title.length > 32
                      ? e.title.slice(0, 32) + "..."
                      : e.title}
                  </h6>
                  <p>
                    {e.description.length > 70
                      ? e.description.slice(0, 70) + "..."
                      : e.description}
                  </p>
                </div>
                <p>
                  {e.location.name.length > 60
                    ? e.location.name.slice(0, 60) + "..."
                    : e.location.name}
                </p>
                <p className="date">
                  Date: <i>{new Date(e.createdAt).toString().slice(0, 15)}</i>
                </p>
                <button
                  className="MyLocations-edit-button"
                  onClick={() => navigate(`/edit/${e._id}`)}
                >
                  <span>Edit</span>
                  <Pencil className="pencil-MyLocations" />
                </button>
              </div>
              {/* <VideolocationModalDetails _id={e._id} /> */}
            </div>
          ))}
      </div>
    </div>
  );
};

export default MyLocations;
