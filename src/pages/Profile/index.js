import { Logout } from "../../components";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { currentUserVideolocationCall } from "../../redux/videolocationSlice";
import "./Profile.css";
import { useEffect, useRef, useState } from "react";
import PreviewVideoCard from "../../components/PreviewVideoCard";
import { handlePlay } from "../../utils/generalUtils";

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
        <img src={user.profilePicture} alt={user.profilePicture} />
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
        <button onClick={() => navigate("/mylocations")}>Manage Posts</button>
        <div className="profile-logout">
          <Logout />
        </div>
      </header>
      <div>
        <div className="videos-container profile-videos-container">
          {currentUserVideolocations &&
            currentUserVideolocations.map((each) => (
              <div className="video-home-grid" key={each._id}>
                <PreviewVideoCard
                  each={each}
                  videoPlay={videoPlay}
                  avatar={false}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;
