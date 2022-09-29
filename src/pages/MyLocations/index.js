import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { currentUserVideolocationCall } from "../../redux/videolocationSlice";
import { useNavigate } from "react-router-dom";
import "./MyLocations.css";
import { Pencil } from "react-bootstrap-icons";
import placeholderVideo from "../../ManhattanCLip1.mp4";
import placeholderPoster from "../../manhattan1.jpg";

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
      <h4>Manage Posts</h4>
      <div className="container-div">
        {currentUserVideolocations &&
          currentUserVideolocations.map((each) => (
            <div className="mylocations-card" key={each._id}>
              <div className="video-container">
                <video
                  src={each.videoUrl}
                  // src={placeholderVideo}
                  // poster={placeholderPoster}
                  poster={`https://res.cloudinary.com/dqxe9yome/video/upload/so_0/${each.public_id}.jpg`}
                />
              </div>
              <div className="info-container">
                <div>
                  <h6>Title:</h6>
                  <p>
                    {each.title}
                  </p>
                </div>
                <div>
                  <h6>Description:</h6>
                  <p>
                    {each.description}
                  </p>
                </div>
                <div>
                  <h6>Date posted:</h6>
                  <p>{new Date(each.createdAt).toString().slice(0, 15)}</p>
                </div>
              </div>
              <button
                  className="MyLocations-edit-button"
                  onClick={() => navigate(`/edit/${each._id}`)}
                >
                  <span>Edit</span>
                  <Pencil className="pencil-MyLocations" />
                </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MyLocations;
