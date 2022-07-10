import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { videolocationsCall } from "../../redux/videolocationSlice";
import { Search } from "react-bootstrap-icons";
import PreviewVideoCard from "../../components/PreviewVideoCard";
import "./Home.css";
import placeholderVideo from "../../santafe-low.mp4";
import placeholderPP from "../../Black-Dog-PNG.png";
import VideoPlayer from "../../components/VideoPlayer";
import { handleDaysCalc } from "../../utils/generalUtils";

function Home() {
  // const [isSearching, setIsSearching] = useState(false);
  // const [suggestionActive, setSuggestionActive] = useState(false);
  // const [suggestionsArr, setSuggestionsArr] = useState(null);
  // const [searchValue, setSearchValue] = useState("");

  // const [videolocationsArr, setVideolocationsArr] = useState(null);

  // const handleInputSearch = (e) => {
  //   if (e.code === "Enter" && e.target.value !== "") {
  //     setSuggestionActive(false);
  //     setIsSearching(true);
  //     const filtered = handleSearch(e.target.value);
  //     setVideolocationsArr(filtered);
  //   }
  //   if (
  //     e.code === "KeyX" ||
  //     (e.code === "Backspace" && e.target.value === "")
  //   ) {
  //     setIsSearching(false);
  //     setSuggestionActive(false);
  //   }
  // };

  // const handleSuggestions = (e) => {
  //   setSearchValue(e.target.value);
  //   const filtered = handleSearch(e.target.value);
  //   setSuggestionsArr(filtered);
  //   if (filtered.length > 0) {
  //     setSuggestionActive(true);
  //   } else {
  //     setSuggestionActive(false);
  //   }
  // };

  // const handleSearch = (searchValue) => {
  //   return videolocations.filter((each) =>
  //     each.title.toLowerCase().includes(searchValue.toLowerCase())
  //   );
  // };

  // const closeSuggestions = () => {
  //   if (suggestionActive) {
  //     setSuggestionActive(false);
  //   }
  // };

  // const handleSelection = (e) => {
  //   closeSuggestions();
  //   setSearchValue(e.target.innerText);
  //   const filtered = handleSearch(e.target.innerText);
  //   setVideolocationsArr(filtered);
  //   setIsSearching(true);
  // };

  // const handleSearchDelete = () => {
  //   setSearchValue("");
  //   setIsSearching(false);
  //   setVideolocationsArr("");
  // };

  const dispatch = useDispatch();
  const videolocations = useSelector(
    (state) => state.videolocation.videolocations
  );
  const hasVerified = useRef(false);
  const [currentVideoPlaying, setCurrentVideoPlaying] = useState(null);
  const [oneVideoPlaying, setOneVideoPlaying] = useState(false);
  const [agoValue, setAgoValue] = useState(null);
  const [views, setViews] = useState(null);

  // const handlePlay = (
  //   video,
  //   setIsVideoPlaying,
  //   currentVideoPlaying,
  //   setCurrentVideoPlaying,
  //   oneVideoPlaying,
  //   setOneVideoPlaying
  // ) => {
  //   if (oneVideoPlaying) {
  //     if (video.current === currentVideoPlaying.video) {
  //       setOneVideoPlaying(false);
  //       setIsVideoPlaying(false);
  //       video.current.pause();
  //     } else {
  //       currentVideoPlaying.video.pause();
  //       currentVideoPlaying.state(false);
  //       setIsVideoPlaying(true);
  //       setCurrentVideoPlaying({
  //         video: video.current,
  //         state: setIsVideoPlaying,
  //       });
  //       video.current.play();
  //     }
  //   } else {
  //     setOneVideoPlaying(true);
  //     setIsVideoPlaying(true);
  //     video.current.play();
  //     setCurrentVideoPlaying({
  //       video: video.current,
  //       state: setIsVideoPlaying,
  //     });
  //   }
  // };

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

  const handleMath = (each) => {
    handleDaysCalc(each.createdAt, setAgoValue);
    handleViews(each.views);
  };

  useEffect(() => {
    if (!hasVerified.current) {
      dispatch(videolocationsCall());
      hasVerified.current = true;
    }
  });

  return (
    <div
      className="Home"
      // onClick={closeSuggestions}
    >
      <div className="playerContainer">
        {videolocations &&
          videolocations.map((each) => (
            <div
              onLoadedMetadata={() => handleMath(each)}
              className="videoCard"
              key={each._id}
            >
              <aside className="topInfo">
                <div className="videocard-avatar-container">
                  <img src={placeholderPP} />
                </div>
                <h6>{each._user.name}</h6>
              </aside>
              <VideoPlayer
                videoInfo={each}
                // videoUrl={placeholderVideo}
                currentVideoPlaying={currentVideoPlaying}
                setCurrentVideoPlaying={setCurrentVideoPlaying}
                oneVideoPlaying={oneVideoPlaying}
                setOneVideoPlaying={setOneVideoPlaying}
              />
              <aside className="bottomInfo">
                <h6>{each.title}</h6>
                <p>
                  {views} • {agoValue}
                </p>
              </aside>
            </div>
          ))}
      </div>

      {/* <div className="searchbar-container-home">
        <input
          onChange={handleSuggestions}
          onKeyUp={handleInputSearch}
          type="text"
          value={searchValue}
          className="MainSearchBar"
          placeholder="Search for a title"
        />
        {!searchValue.length ? null : (
          <p onClick={handleSearchDelete} className="closeSearchbar">
            x
          </p>
        )}
        <Search className="Search" />
        {suggestionActive && (
          <>
            <div className="triangle"></div>
            <div className="Home-suggestions">
              {suggestionsArr &&
                suggestionsArr.map((each) => (
                  <p key={each._id} onClick={handleSelection}>
                    {each.title}
                  </p>
                ))}
            </div>
          </>
        )}
      </div> */}
    </div>
  );
}

export default Home;
