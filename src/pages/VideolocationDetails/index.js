import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { videolocationDetailsProcess } from "../../redux/videolocationSlice";
import { useParams } from "react-router-dom";
import EditVideolocationModal from "../../components/EditVideolocationModal";
import "./VideolocationDetails.css";

const VideolocationDetails = () => {
  const videolocationDetails = useSelector(
    (state) => state.videolocation.videolocationDetails
  );
  const dispatch = useDispatch();
  const hasVerified = useRef(false);
  const { _id } = useParams();


  useEffect(() => {
    if (!hasVerified.current) {
      dispatch(videolocationDetailsProcess(_id));
      hasVerified.current = true;
    }
  });

  return (
    <>
      <h1>Details</h1>
      {videolocationDetails && (
        <div className="details-container">
          <div>
            <EditVideolocationModal
              locationId={videolocationDetails._id}
              publicId={videolocationDetails.public_id}
            />
            <h2>{videolocationDetails.title}</h2>
            <p>{videolocationDetails.description}</p>
            <div className="video-container-details">
              <video src={videolocationDetails.videoUrl} controls />
            </div>
          </div>
          <div>
            <h1>Aqui va el mapa</h1>
          </div>
        </div>
      )}
    </>
  );
};

export default VideolocationDetails;
