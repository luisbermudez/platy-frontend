import { Play, VolumeUp, Pause, VolumeMute } from "react-bootstrap-icons";
import { useRef, useState, useEffect } from "react";
import { handlePlay } from "../../utils/generalUtils";
import "./VideoPlayer.css";

// Detects when element is in viewport
const useElementOnScreen = (targetRef) => {
  const [isVisible, setIsVisible] = useState();

  // The entry intersecting gets its state changed to visible
  const callbackFunction = ([entry]) => {
    setIsVisible(entry.isIntersecting);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(callbackFunction, {
      root: null,
      threshold: 1,
    });
    const currentTarget = targetRef.current;

    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) observer.unobserve(currentTarget);
    };
  }, [targetRef]);

  return isVisible;
};

const VideoPlayer = ({
  videoInfo,
  currentVideoPlaying,
  setCurrentVideoPlaying,
  oneVideoPlaying,
  setOneVideoPlaying,
}) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);
  const isVisible = useElementOnScreen(videoRef);
  const videoPoster = `https://res.cloudinary.com/dqxe9yome/video/upload/so_0/${videoInfo.public_id}.jpg`;

  const handleVolume = () => {
    if (isMuted) {
      videoRef.current.muted = false;
      return setIsMuted(false);
    }
    videoRef.current.muted = true;
    return setIsMuted(true);
  };

  useEffect(() => {
    if (isVisible && !isVideoPlaying) {
      handlePlay(
        videoRef,
        setIsVideoPlaying,
        currentVideoPlaying,
        setCurrentVideoPlaying,
        oneVideoPlaying,
        setOneVideoPlaying
      );
    }
  }, [isVisible]);

  return (
    <div className="VideoPlayer">
      {videoInfo.videoUrl && (
        <video
          ref={videoRef}
          onClick={() => {
            handlePlay(
              videoRef,
              setIsVideoPlaying,
              currentVideoPlaying,
              setCurrentVideoPlaying,
              oneVideoPlaying,
              setOneVideoPlaying
            );
          }}
          src={videoInfo.videoUrl}
          loop
          playsInline
          muted={true}
          poster={videoPoster}
        />
      )}
      <>
        <div
          onClick={() => {
            handlePlay(
              videoRef,
              setIsVideoPlaying,
              currentVideoPlaying,
              setCurrentVideoPlaying,
              oneVideoPlaying,
              setOneVideoPlaying
            );
          }}
          className="play-toggle"
        >
          {isVideoPlaying ? (
            <Pause className="pause" />
          ) : (
            <Play className="play" />
          )}
        </div>
        <div onClick={handleVolume} className="volume-toggle">
          {isMuted ? <VolumeMute /> : <VolumeUp />}
        </div>
      </>
    </div>
  );
};

export default VideoPlayer;
