import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { videolocationsCall } from "../../redux/videolocationSlice";
import { Search } from "react-bootstrap-icons";
import PreviewVideoCard from "../../components/PreviewVideoCard";
import "./Home.css";
import placeholderPP from "../../Black-Dog-PNG.png";
import VideoPlayer from "../../components/VideoPlayer";
import VideoInfoHomeCard from "../../components/VideoInfoHomeCard";
import $ from "jquery";

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

    $(window).on("resize", () => {
      clearTimeout(window.resizedFinished);
      window.resizedFinished = setTimeout(() => {
        window.location.reload();
      }, 250);
    });

    return () => {
      $(window).off("resize");
    };
  }, []);

  // useEffect(() => {
  //   let oldScroll = 0;

  //   const playerContainer = document.getElementById("playerContainer");
  //   playerContainer.addEventListener(
  //     "scroll",
  //     () => {
  //       console.log(scrollUp);
  //       if (playerContainer.scrollTop > oldScroll) {
  //         scrollUp = false;
  //       } else {
  //         scrollUp = true;
  //       }
  //       oldScroll = playerContainer.scrollTop;
  //     },
  //     false
  //   );
  // }, []);

  return (
    <div
      className="Home"
      // onClick={closeSuggestions}
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
