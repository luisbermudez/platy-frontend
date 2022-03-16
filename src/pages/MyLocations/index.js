import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { currentUserVideolocationCall } from "../../redux/videolocationSlice";
// import VideolocationModalDetails from "../../components/VideolocationModalDetails";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const MyLocations = () => {
  const user = useSelector((state) => state.auth.user);
  const currentUserVideolocations = useSelector(
    (state) => state.videolocation.currentUserVideolocations
  );
  const dispatch = useDispatch();
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
              <video src={e.videoUrl} height="300" />
              <br />
              {/* <VideolocationModalDetails _id={e._id} /> */}
              <Link to={`/details/${e._id}`}>
                <Button>Details</Button>
              </Link>
            </div>
          ))}
      </div>
    </>
  );
};

export default MyLocations;
