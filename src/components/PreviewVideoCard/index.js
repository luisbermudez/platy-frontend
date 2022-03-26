import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PreviewVideoCard.css";
import { handleDaysCalc } from "../../utils/generalUtils";

const PreviewVideoCard = ({ each, videoPlay, avatar }) => {
  const navigate = useNavigate();
  const [agoValue, setAgoValue] = useState(null);
  const [views, setViews] = useState(null);

  const handleViews = (views) => {
    if (views === 1) {
      return setViews("1 View");
    }
    if (views > 999) {
      const ks = Math.floor(views / 1000);
      return setViews(ks + "K Views");
    }
    setViews(views + " Views");
  };

  const handleMath = () => {
    handleDaysCalc(each.createdAt, setAgoValue);
    handleViews(each.views);
  };

  return (
    <div
      onLoadedMetadata={handleMath}
      key={each._id}
      className="videocard-container"
      onClick={() => navigate(`/details/${each._id}`)}
      onMouseOut={videoPlay}
      onMouseOver={videoPlay}
    >
      <video
        id="videoHome"
        src={each.videoUrl}
        alt="Location Video"
        loop
        muted
      />
      {avatar && (
        <div className="videoPreviewAvatarContainer">
          <img
            className="videoPreviewAvatar"
            alt={each._user.name}
            src={each._user.profilePicture}
          />
        </div>
      )}
      <div className="video-description">
        <h6>
          {each.title.length > 40
            ? each.title.slice(0, 40) + "..."
            : each.title}
        </h6>
        <p className="viewsCount">
          {views} • {agoValue}
        </p>
      </div>
    </div>
  );
};

export default PreviewVideoCard;
