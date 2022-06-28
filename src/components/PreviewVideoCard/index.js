import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import "./PreviewVideoCard.css";
import { handleDaysCalc } from "../../utils/generalUtils";
import placeholderVideo from "../../santafe-low.mp4";
import dogo from "../../Black-Dog-PNG.png";

const PreviewVideoCard = ({ each, videoPlay }) => {
  // const navigate = useNavigate();
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
      // onClick={() => navigate(`/details/${each._id}`)}
      onMouseOut={videoPlay}
      onMouseOver={videoPlay}
    >
      <video
        // src={each.videoUrl}
        src={placeholderVideo}
        alt="Location Video"
        loop
        muted
      />
      <aside>
        <div className="videocard-avatar-container">
          <img
            // src={each._user.profilePicture}
            src={dogo}
          />
        </div>
        <div className="video-description">
          {/* <h6>
            {each.title.length > 40
              ? each.title.slice(0, 40) + "..."
              : each.title}
          </h6>
          <p>
            {views} • {agoValue}
          </p> */}
          <h6>{each._user.name}</h6>
          <p>{each.title}</p>
        </div>
      </aside>
    </div>
  );
};

export default PreviewVideoCard;
