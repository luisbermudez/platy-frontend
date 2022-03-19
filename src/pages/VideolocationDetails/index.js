import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { videolocationDetailsProcess } from "../../redux/videolocationSlice";
import { useParams } from "react-router-dom";
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
      {videolocationDetails && (
        <div className="details-container">
          <div>
            <h2>{videolocationDetails.title}</h2>
            <p>{videolocationDetails.description}</p>
            <video
              src={videolocationDetails.videoUrl}
              controls
              loop
              height="400px"
            />
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
