import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  videolocationDetailsProcess,
  clearVideolocationDetails,
} from "../../redux/videolocationSlice";
import VideoPlayer from "../../components/VideoPlayer";
import { useParams } from "react-router-dom";
import "./VideolocationDetails.css";
import MapForVideoDetails from "../../components/MapForVideoDetails";
import { handleDaysCalc } from "../../utils/generalUtils";
import { addOneViewWs } from "../../services/videolocation-ws";

const VideolocationDetails = () => {
  const videolocationDetails = useSelector(
    (state) => state.videolocation.videolocationDetails
  );
  const dispatch = useDispatch();
  const hasVerified = useRef(false);
  const [daysAgo, setDaysAgo] = useState(null);
  const { _id } = useParams();

  useEffect(() => {
    if (!hasVerified.current) {
      dispatch(videolocationDetailsProcess(_id));
      hasVerified.current = true;
    }
  });

  useEffect(() => {
    return () => {
      dispatch(clearVideolocationDetails());
      addOneViewWs({ _id });
    };
  }, []);

  return (
    <div className="VideolocationDetails">
      {videolocationDetails && (
        <>
          <div
            onLoadStart={() =>
              handleDaysCalc(videolocationDetails.createdAt, setDaysAgo)
            }
            className="video"
          >
            <VideoPlayer
              videoUrl={videolocationDetails.videoUrl}
              controls={true}
              muted={false}
            />
            <div className="information">
              {/* <div className="user-details">
                <img
                  className="videoDetails-avatar"
                  alt={videolocationDetails._user.name}
                  src={videolocationDetails._user.profilePicture}
                />
                <h4>{videolocationDetails._user.name}</h4>
              </div> */}
              <div className="title-views-container">
                <h5>
                  {videolocationDetails.title.length > 160
                    ? videolocationDetails.title.slice(0, 160) + "..."
                    : videolocationDetails.title}
                </h5>
                <p>
                  {videolocationDetails.views} views • {daysAgo}
                </p>
              </div>
            </div>
          </div>
          <div className="map">
            <MapForVideoDetails
              lng={videolocationDetails.location.coordinates.longitude}
              lat={videolocationDetails.location.coordinates.latitude}
              draggable={false}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default VideolocationDetails;
