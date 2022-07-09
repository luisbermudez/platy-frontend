export const handleDaysCalc = (createdAt, setAgoValue) => {
  const res = Math.abs(
    Math.trunc((new Date(createdAt) - new Date()) / (1000 * 3600 * 24))
  );
  if (res < 1) {
    return setAgoValue("Created Today");
  }
  if (res > 28) {
    const months = Math.floor(res / 30);
    return months <= 1
      ? setAgoValue("1 Month Ago")
      : setAgoValue(months + " Months Ago");
  }
  if (res > 6) {
    const weeks = Math.floor(res / 7);
    return weeks <= 1
      ? setAgoValue("1 Week Ago")
      : setAgoValue(weeks + " Weeks Ago");
  }
  return res === 1 ? setAgoValue("1 Day Ago") : setAgoValue(res + " Days Ago");
};

// export const handlePlay = (
//   e,
//   isVideoPlaying,
//   currentlyPlaying,
//   setIsVideoPlaying,
//   videoRef,
//   setCurrentlyPlaying
// ) => {
//   if (isVideoPlaying) {
//     if (e.target === currentlyPlaying) {
//       setIsVideoPlaying(false);
//       videoRef.current.pause();
//     } else {
//       currentlyPlaying.pause();
//       setCurrentlyPlaying(e.target);
//       videoRef.current.play();
//     }
//   } else {
//     setIsVideoPlaying(true);
//     setCurrentlyPlaying(e.target);
//     videoRef.current.play();
//   }
// };

export const handlePlay = (
  video,
  setIsVideoPlaying,
  currentVideoPlaying,
  setCurrentVideoPlaying,
  oneVideoPlaying,
  setOneVideoPlaying
) => {
  if (oneVideoPlaying) {
    if (video.current === currentVideoPlaying.video) {
      setOneVideoPlaying(false);
      setIsVideoPlaying(false);
      video.current.pause();
    } else {
      currentVideoPlaying.video.pause();
      currentVideoPlaying.state(false);
      setIsVideoPlaying(true);
      setCurrentVideoPlaying({
        video: video.current,
        state: setIsVideoPlaying,
      });
      video.current.play();
    }
  } else {
    setOneVideoPlaying(true);
    setIsVideoPlaying(true);
    video.current.play();
    setCurrentVideoPlaying({
      video: video.current,
      state: setIsVideoPlaying,
    });
  }
};
