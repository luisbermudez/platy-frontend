import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { currentUserVideolocationCall } from "../../redux/videolocationSlice";
// import VideolocationModalDetails from "../../components/VideolocationModalDetails";
import { useNavigate } from "react-router-dom";

const MyLocations = () => {
  const user = useSelector((state) => state.auth.user);
  const currentUserVideolocations = useSelector(
    (state) => state.videolocation.currentUserVideolocations
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const hasVerified = useRef(false);

  useEffect(() => {
    if (!hasVerified.current) {
      dispatch(currentUserVideolocationCall(user));
      hasVerified.current = true;
    }
  });

  return (
    <>
      <h1>My Locations</h1>
      <div className="videos-container">
        {currentUserVideolocations &&
          currentUserVideolocations.map((e) => (
            <div key={e._id}>
              <h2>{e.title}</h2>
              <p>{e.description}</p>
              <video src={e.videoUrl} controls height="300" />
              <br />
              {/* <VideolocationModalDetails _id={e._id} /> */}
              <button onClick={() => navigate(`/edit/${e._id}`)}>Edit</button>
            </div>
          ))}
      </div>
    </>
  );
};

export default MyLocations;
