import "./VideoPreviewForMap.css";

const VideoPreviewForMap = ({ each }) => {
  return (
    <div
      key={each._id}
      className="videocard-container videocard-container-ForMap"
    >
      <video
        id="videoHome"
        src={each.videoUrl}
        alt="Location Video"
        loop
        onMouseEnter={(e) => e.target.play()}
        onMouseLeave={(e) => e.target.pause()}
        onPlay={(e) => {
          e.target.muted = false;
        }}
      />
      <div className="videoPreviewAvatarContainer">
        <img
          className="videoPreviewAvatar"
          alt={each._user.name}
          src={each._user.profilePicture}
        />
      </div>
      <div className="video-description">
        <h6>
          {each.title.length > 40
            ? each.title.slice(0, 40) + "..."
            : each.title}
        </h6>
        <p className="viewsCount">
          <a
            className="anchorDetails"
            href={`https://platy.netlify.app/details/${each._id}`}
          >
            More details
          </a>
        </p>
      </div>
    </div>
  );
};

export default VideoPreviewForMap;
