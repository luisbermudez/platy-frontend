import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { videolocationsCall } from "../../redux/videolocationSlice";
import "./Home.css";
import placeholderPP from "../../Black-Dog-PNG.png";
import VideoPlayer from "../../components/VideoPlayer";
import VideoInfoHomeCard from "../../components/VideoInfoHomeCard";

function Home() {
  const dispatch = useDispatch();
  const videolocations = useSelector(
    (state) => state.videolocation.videolocations
  );
  const [currentVideoPlaying, setCurrentVideoPlaying] = useState(null);
  const [oneVideoPlaying, setOneVideoPlaying] = useState(false);
  const videosGlobalState = [
    currentVideoPlaying,
    setCurrentVideoPlaying,
    oneVideoPlaying,
    setOneVideoPlaying,
  ];

  useEffect(() => {
    dispatch(videolocationsCall());
  }, []);

  return (
    <div
      className="Home"
    >
      <div className="playerContainer" id="playerContainer">
        {videolocations &&
          videolocations.map((each) => (
            <div className="videoCard" key={each._id}>
              <aside className="topInfo">
                <div className="videocard-avatar-container">
                  <img src={placeholderPP} />
                </div>
                <h6>{each._user.name}</h6>
              </aside>
              <VideoPlayer
                videoInfo={each}
                videosGlobalState={videosGlobalState}
                singleVideo={false}
              />
              <VideoInfoHomeCard videoInfo={each} />
            </div>
          ))}
      </div>
    </div>
  );
}

export default Home;
