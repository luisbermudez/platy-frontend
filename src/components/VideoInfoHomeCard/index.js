import { handleViews, handleDaysCalc } from "../../utils/generalUtils";
import "./VideoInfoHomeCard.css";

const VideoInfoHomeCard = ({ videoInfo }) => {
  return (
    <div className="VideoInfoHomeCard">
      <h6>{videoInfo.title}</h6>
      <p>
        {handleViews(videoInfo.views)} • {handleDaysCalc(videoInfo.createdAt)}
      </p>
    </div>
  );
};

export default VideoInfoHomeCard;
