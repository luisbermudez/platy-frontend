import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { videolocationsCall } from "../../redux/videolocationSlice";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const videolocations = useSelector(
    (state) => state.videolocation.videolocations
  );
  const hasVerified = useRef(false);
  const videoDescription = useRef(null);

  let videoRef = useRef(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(undefined);

  const videoPlay = (e) => {
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
      <div className="videos-container">
        {videolocations &&
          videolocations.map((e) => (
            <div
              key={e._id}
              className="videocard-container"
              onClick={() => navigate(`/details/${e._id}`)}
              onMouseOut={videoPlay}
              onMouseOver={videoPlay}
            >
              {/* <div className="testito"> */}
                <video
                  src={e.videoUrl}
                  alt="Location Video"
                  loop
                  muted
                />
              {/* </div> */}

              <div ref={videoDescription} className="video-description">
                <h6>{e.title}</h6>
                <p>{e.description}</p>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

export default Home;
