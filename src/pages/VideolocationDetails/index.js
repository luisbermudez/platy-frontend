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
import { handleDaysCalc, handleViews } from "../../utils/generalUtils";
import { addOneViewWs } from "../../services/videolocation-ws";
import placeholderProfilePic from "../../Black-Dog-PNG.png";

const VideolocationDetails = () => {
  const videolocationDetails = useSelector(
    (state) => state.videolocation.videolocationDetails
  );
  const dispatch = useDispatch();
  const hasVerified = useRef(false);
  const [daysAgo, setDaysAgo] = useState(null);
  const { _id } = useParams();

  // Calls server to get video info
  useEffect(() => {
    if (!hasVerified.current) {
      dispatch(videolocationDetailsProcess(_id));
      hasVerified.current = true;
    }
  });

  // useEffect(() => {
  //   return () => {
  //     dispatch(clearVideolocationDetails());
  //     addOneViewWs({ _id });
  //   };
  // }, []);

  return (
    <div className="VideolocationDetails">
      {videolocationDetails && (
        <>
          <div className="info-primary">
            <div>
              <img
                alt={videolocationDetails._user.name}
                // src={videolocationDetails._user.profilePicture}
                src={placeholderProfilePic}
              />
            </div>
            <div>
              <h6>{videolocationDetails._user.username}</h6>
            </div>
          </div>
          <div
            onLoadStart={() =>
              handleDaysCalc(videolocationDetails.createdAt, setDaysAgo)
            }
            className="video"
          >
            <VideoPlayer
              videoInfo={videolocationDetails}
              videosGlobalState={null}
              singleVideo={true}
            />
          </div>
          <div className="info-secondary">
            <h6>{videolocationDetails.title}</h6>
            <p>
              {handleViews(videolocationDetails.views)} •{" "}
              {handleDaysCalc(videolocationDetails.createdAt)}
            </p>
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
