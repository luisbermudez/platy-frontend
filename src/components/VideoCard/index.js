import "./VideoCard.css";

const VideoCard = ({ videoInfo, onClick }) => {
  return (
    <video
      onClick={onClick}
      src={videoInfo.videoUrl}
      alt="Location Video"
      loop
      muted
    />
  );
};

export default VideoCard;
