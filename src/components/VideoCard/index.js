import "./VideoCard.css";

const VideoCard = ({ videoInfo, onClick }) => {
  return (
    <>
      <video
        onClick={onClick}
        src={videoInfo.videoUrl}
        alt="Location Video"
        height="500"
        loop
      />
    </>
  );
};

export default VideoCard;
