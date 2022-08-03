import { Play, VolumeUp, Pause, VolumeMute } from "react-bootstrap-icons";
import { useRef, useState, useEffect } from "react";
import { handlePlay } from "../../utils/generalUtils";
import placeholderVideo from "../../ManhattanCLip1.mp4";
import placeholderPoster from "../../manhattan1.jpg";
import "./VideoPlayer.css";

// Detects when element is in viewport
const useElementOnScreen = (targetRef, singleVideo) => {
  const [isVisible, setIsVisible] = useState();
  const viewportVideoContainer = document.getElementById("playerContainer");

  // The entry intersecting gets its state changed to visible
  const visibleStateCallback = ([entry]) => {
    setIsVisible(entry.isIntersecting);
  };

  const calcHeight = () => {
    const noMargin = {
      top: 0,
      bottom: 0,
    };
    if (singleVideo) {
      return noMargin;
    }
    const playerContainer = document.getElementById("playerContainer");
    const viewerHeight = playerContainer.clientHeight;
    const videoplayerHeight =
      document.getElementById("VideoPlayer").clientHeight;

    const res = viewerHeight - videoplayerHeight;
    const topHeight = 80;

    const topAndBottom = {
      top: -topHeight,
      bottom: -(res - topHeight),
    };
    return res > 0 ? topAndBottom : noMargin;
  };

  const setObserver = (currentTarget) => {
    const getMargin = calcHeight();

    const playerObserver = new IntersectionObserver(visibleStateCallback, {
      root: viewportVideoContainer,
      threshold: 0.2,
      rootMargin: `${getMargin.top}px 0px ${getMargin.bottom}px 0px`,
    });

    if (currentTarget) {
      playerObserver.observe(currentTarget);
    }

    return playerObserver;
  };

  useEffect(() => {
    const currentTarget = targetRef.current;
    let observerIntersector = setObserver(currentTarget);

    return () => {
      if (currentTarget) {
        observerIntersector.unobserve(currentTarget);
      }
    };
  }, []);

  return isVisible;
};

const VideoPlayer = ({ videoInfo, videosGlobalState, singleVideo }) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);
  const isVisible = useElementOnScreen(videoRef, singleVideo);
  const videoPoster = `https://res.cloudinary.com/dqxe9yome/video/upload/so_0/${videoInfo.public_id}.jpg`;
  const handleVideoParams = [videoRef, setIsVideoPlaying, videosGlobalState];

  const callHandlePlayFunct = () => {
    if (singleVideo) {
      if (isVideoPlaying) {
        setIsVideoPlaying(false);
        videoRef.current.pause();
      } else {
        setIsVideoPlaying(true);
        videoRef.current.play();
      }
    } else {
      handlePlay(handleVideoParams);
    }
  };

  const handleVolume = () => {
    if (isMuted) {
      videoRef.current.muted = false;
      return setIsMuted(false);
    }
    videoRef.current.muted = true;
    return setIsMuted(true);
  };

  const videoReady = () => {
    if (!isVideoPlaying) {
      callHandlePlayFunct();
    }
  };

  useEffect(() => {
    if (isVisible) {
      if (videoRef.current.readyState == 4) {
        return videoReady();
      } else {
        videoRef.current.load();
      }

      videoRef.current.addEventListener("loadeddata", () => {
        videoReady();
      });
    }
  }, [isVisible]);

  return (
    <div className="VideoPlayer" id="VideoPlayer">
      {videoInfo.videoUrl && (
        <video
          ref={videoRef}
          onClick={() => {
            callHandlePlayFunct();
          }}
          // src={videoInfo.videoUrl}
          src={placeholderVideo}
          loop
          playsInline
          muted={true}
          // poster={videoPoster}
          poster={placeholderPoster}
          preload="metadata"
        />
      )}
      <>
        <div
          onClick={() => {
            callHandlePlayFunct();
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
