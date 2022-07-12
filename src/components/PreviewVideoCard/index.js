import { useState } from "react";
import "./PreviewVideoCard.css";
import { handleDaysCalc } from "../../utils/generalUtils";
import placeholderVideo from "../../santafe-low.mp4";
import dogo from "../../Black-Dog-PNG.png";
import VideoPlayer from "../VideoPlayer";

const PreviewVideoCard = ({ each }) => {
  return (
    <div
      key={each._id}
      className="videocard-container"
    >
      <VideoPlayer
        videoInfo={each}
        videosGlobalState={null}
        singleVideo={true}
      />
      <aside>
        <div className="videocard-avatar-container">
          <img
            // src={each._user.profilePicture}
            src={dogo}
          />
        </div>
        <div className="video-description">
          <h6>{each._user.name}</h6>
          <p>{each.title}</p>
        </div>
      </aside>
    </div>
  );
};

export default PreviewVideoCard;
