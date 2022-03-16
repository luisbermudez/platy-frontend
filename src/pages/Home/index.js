import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { videolocationsCall } from "../../redux/videolocationSlice";
import VideoCard from "../../components/VideoCard";
import "./Home.css";

function Home() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const videolocations = useSelector(
    (state) => state.videolocation.videolocations
  );
  const hasVerified = useRef(false);

  let videoRef = useRef(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(undefined);

  const videOnClick = (e) => {
    videoRef.current = e.target;
    handlePlay(e);
  };

  const handlePlay = (e) => {
    if (isVideoPlaying) {
      if (e.target === currentlyPlaying) {
        setIsVideoPlaying(false);
        videoRef.current.pause();
      } else {
        currentlyPlaying.pause();
        setCurrentlyPlaying(e.target);
        videoRef.current.play();
      }
    } else {
      setIsVideoPlaying(true);
      setCurrentlyPlaying(e.target);
      videoRef.current.play();
    }
  };

  useEffect(() => {
    if (!hasVerified.current) {
      dispatch(videolocationsCall());
      hasVerified.current = true;
    }
  });

  return (
    <>
      {isLoggedIn ? (
        <>
          <h1>Welcome {user.name}</h1>
          <i>@{user.username}</i>
        </>
      ) : (
        <>
          <h1>Welcome</h1>
        </>
      )}
      <div className="videos-container">
        {videolocations &&
          videolocations.map((e) => (
            <VideoCard onClick={videOnClick} key={e._id} videoInfo={e} />
          ))}
      </div>
    </>
  );
}

export default Home;
