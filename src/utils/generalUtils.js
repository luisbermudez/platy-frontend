export const handleDaysCalc = (createdAt) => {
  const res = Math.abs(
    Math.trunc((new Date(createdAt) - new Date()) / (1000 * 3600 * 24))
  );
  if (res < 1) {
    return "Created Today";
  }
  if (res > 28) {
    const months = Math.floor(res / 30);
    return months <= 1 ? "1 Month Ago" : months + " Months Ago";
  }
  if (res > 6) {
    const weeks = Math.floor(res / 7);
    return weeks <= 1 ? "1 Week Ago" : weeks + " Weeks Ago";
  }
  return res === 1 ? "1 Day Ago" : res + " Days Ago";
};

export const handleViews = (views) => {
  if (views === 1) {
    return "1 View";
  }
  if (views > 999) {
    const ks = Math.floor(views / 1000);
    return ks + "K Views";
  }
  return views + " Views";
};

export const handlePlay = (params) => {
  const [video, setIsVideoPlaying, videosGlobalState] = params;
  const [
    currentVideoPlaying,
    setCurrentVideoPlaying,
    oneVideoPlaying,
    setOneVideoPlaying,
  ] = videosGlobalState;

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
