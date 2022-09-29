import { handleViews, handleDaysCalc } from "../../utils/generalUtils";
import "./VideoInfoHomeCard.css";
import { useNavigate } from "react-router-dom";

const VideoInfoHomeCard = ({ videoInfo }) => {
  const navigate = useNavigate();

  return (
    <div
      className="VideoInfoHomeCard"
      onClick={() => navigate(`/details/${videoInfo._id}`)}
    >
      <h6>{videoInfo.title}</h6>
      <p>
        {handleViews(videoInfo.views)} • {handleDaysCalc(videoInfo.createdAt)}
      </p>
    </div>
  );
};

export default VideoInfoHomeCard;
