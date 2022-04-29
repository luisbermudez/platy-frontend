import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { currentUserVideolocationCall } from "../../redux/videolocationSlice";
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
      <h1>My Posts</h1>
      <div className="MyLocations-videos-container">
        {currentUserVideolocations &&
          currentUserVideolocations.map((e) => (
            <div className="mylocations-general-container" key={e._id}>
              <div className="MyLocations-video-container">
                <video src={e.videoUrl} />
              </div>
              <div className="MyLocation-information-container">
                <div>
                  <p className="locationTitle-mylocations">Title:</p>
                  <p>
                    {e.title.length > 32
                      ? e.title.slice(0, 32) + "..."
                      : e.title}
                  </p>
                </div>
                <div>
                  <p className="locationTitle-mylocations">Description:</p>
                  <p>
                    {e.description.length > 70
                      ? e.description.slice(0, 70) + "..."
                      : e.description}
                  </p>
                </div>
                <div>
                  <p className="date">Date:</p>
                  <p>{new Date(e.createdAt).toString().slice(0, 15)}</p>
                </div>
                <button
                  className="MyLocations-edit-button"
                  onClick={() => navigate(`/edit/${e._id}`)}
                >
                  <span>Edit</span>
                  <Pencil className="pencil-MyLocations" />
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MyLocations;
