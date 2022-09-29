import { Logout } from "../../components";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { currentUserVideolocationCall } from "../../redux/videolocationSlice";
import "./Profile.css";
import { useEffect, useRef, useState } from "react";
import { handlePlay } from "../../utils/generalUtils";
import placeholderPoster from "../../manhattan1.jpg";
import placeholderVideo from "../../ManhattanCLip1.mp4";
import placeholderProfilePic from "../../Black-Dog-PNG.png";

function Profile() {
  const user = useSelector((state) => state.auth.user);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const hasVerified = useRef(false);
  const videoRef = useRef(null);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(undefined);
  const currentUserVideolocations = useSelector(
    (state) => state.videolocation.currentUserVideolocations
  );

  const videoPlay = (e) => {
    videoRef.current = e.target;
    handlePlay(
      e,
      isVideoPlaying,
      currentlyPlaying,
      setIsVideoPlaying,
      videoRef,
      setCurrentlyPlaying
    );
  };

  useEffect(() => {
    if (!hasVerified.current) {
      dispatch(currentUserVideolocationCall(user));
      hasVerified.current = true;
    }
  });

  return (
    <div className="Profile">
      <header>
        <div className="profile-info">
          <div>
            <img
              // src={user.profilePicture}
              src={placeholderProfilePic}
              alt={user.profilePicture}
            />
          </div>
          <div>
            <h4>{user.name}</h4>
            <p>
              {currentUserVideolocations && (
                <>
                  <b>{currentUserVideolocations.length} </b>Posts
                </>
              )}
            </p>
          </div>
          <div>
            <button onClick={() => navigate("/mylocations")}>
              Manage Posts
            </button>
            {/* <button>Edit Profile</button> */}
          </div>
        </div>
        <div className="profile-logout">
          <Logout />
        </div>
      </header>
      <div className="profile-videos-container">
        <div>
          {currentUserVideolocations &&
            (currentUserVideolocations.length ? (
              <div className="videos-grid">
                {currentUserVideolocations.map((each) => (
                  <div key={each._id} className="video-card">
                    <video
                      src={each.videoUrl}
                      // src={placeholderVideo}
                      loop
                      playsInline
                      muted={true}
                      poster={`https://res.cloudinary.com/dqxe9yome/video/upload/so_0/${each.public_id}.jpg`}
                      // poster={placeholderPoster}
                      preload="metadata"
                      onClick={() =>
                        navigate(`/details/${each._id}`)
                      }
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-content">
                <h5>You have not posted any content yet</h5>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;
