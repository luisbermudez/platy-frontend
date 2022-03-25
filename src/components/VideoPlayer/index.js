import { Play, VolumeUp, Pause, VolumeMute } from "react-bootstrap-icons";
import { useRef, useState } from "react";
import "./VideoPlayer.css";

const VideoPlayer = ({ videoUrl, controls }) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef(null);
  const controlsRef = useRef(controls);

  const handlePlay = () => {
    if (!controls) return;
    if (isVideoPlaying) {
      videoRef.current.pause();
      return setIsVideoPlaying(false);
    }
    videoRef.current.play();
    return setIsVideoPlaying(true);
  };

  const handleVolume = () => {
    if (isMuted) {
      videoRef.current.muted = false;
      return setIsMuted(false);
    }
    videoRef.current.muted = true;
    return setIsMuted(true);
  };

  return (
    <div className="VideoPlayer">
      {videoUrl && (
        <video ref={videoRef} onClick={handlePlay} src={videoUrl} loop />
      )}
      {controlsRef.current && (
        <>
          <div onClick={handlePlay} className="play-toggle">
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
      )}
    </div>
  );
};

export default VideoPlayer;