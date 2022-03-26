import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  videolocationsCall,
  setCurrentPage,
} from "../../redux/videolocationSlice";
import { Search } from "react-bootstrap-icons";
import PreviewVideoCard from "../../components/PreviewVideoCard";
import "./Home.css";
import { handlePlay } from "../../utils/generalUtils";

function Home() {
  const dispatch = useDispatch();
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(undefined);

  const [isSearching, setIsSearching] = useState(false);
  const [suggestionActive, setSuggestionActive] = useState(false);
  const [suggestionsArr, setSuggestionsArr] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  const [videolocationsArr, setVideolocationsArr] = useState(null);
  const videolocations = useSelector(
    (state) => state.videolocation.videolocations
  );

  const hasVerified = useRef(false);
  const videoRef = useRef(null);

  const videoPlay = (e) => {
    videoRef.current = e.target;
    handlePlay(
      e,
      isVideoPlaying,
      currentlyPlaying,
      setIsVideoPlaying,
      videoRef,
      setCurrentlyPlaying
    );
  };

  const handleInputSearch = (e) => {
    if (e.code === "Enter" && e.target.value !== "") {
      setSuggestionActive(false);
      setIsSearching(true);
      const filtered = handleSearch(e.target.value);
      setVideolocationsArr(filtered);
    }
    if (
      e.code === "KeyX" ||
      (e.code === "Backspace" && e.target.value === "")
    ) {
      setIsSearching(false);
      setSuggestionActive(false);
    }
  };

  const handleSuggestions = (e) => {
    setSearchValue(e.target.value);
    const filtered = handleSearch(e.target.value);
    setSuggestionsArr(filtered);
    if (filtered.length > 0) {
      setSuggestionActive(true);
    } else {
      setSuggestionActive(false);
    }
  };

  const handleSearch = (searchValue) => {
    return videolocations.filter((each) =>
      each.title.toLowerCase().includes(searchValue.toLowerCase())
    );
  };

  const closeSuggestions = () => {
    if (suggestionActive) {
      setSuggestionActive(false);
    }
  };

  const handleSelection = (e) => {
    closeSuggestions();
    setSearchValue(e.target.innerText);
    const filtered = handleSearch(e.target.innerText);
    setVideolocationsArr(filtered);
    setIsSearching(true);
  };

  const handleSearchDelete = () => {
    setSearchValue("");
    setIsSearching(false);
    setVideolocationsArr("");
  };

  useEffect(() => {
    if (!hasVerified.current) {
      dispatch(videolocationsCall());
      dispatch(setCurrentPage("discover"));
      hasVerified.current = true;
    }
  });

  useEffect(() => {
    return () => {
      dispatch(setCurrentPage("other"));
    };
  }, []);

  return (
    <div className="Home" onClick={closeSuggestions}>
      <div className="searchbar-container-home">
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
          <div className="Home-suggestions">
            {suggestionsArr &&
              suggestionsArr.map((each) => (
                <p key={each._id} onClick={handleSelection}>
                  {each.title}
                </p>
              ))}
          </div>
        )}
      </div>
      <div className="videos-container">
        {isSearching ? (
          videolocationsArr.length < 1 ? (
            <h1>Sorry, no matches found</h1>
          ) : (
            videolocationsArr.map((each) => (
              <div className="video-home-grid" key={each._id}>
                <PreviewVideoCard
                  each={each}
                  videoPlay={videoPlay}
                  avatar={true}
                />
              </div>
            ))
          )
        ) : (
          videolocations &&
          videolocations.map((each) => (
            <div className="video-home-grid" key={each._id}>
              <PreviewVideoCard
                each={each}
                videoPlay={videoPlay}
                avatar={true}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
