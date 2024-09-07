import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/assets";

// Create the context
export const PlayContext = createContext(null);

const PlayContextProvider = (props) => {
  // References
  const audioRef = useRef(null);
  const seekBar = useRef(null);
  const seekBg = useRef(null);

  // State
  const [track, setTrack] = useState(songsData[0]); // Current track
  const [playStatus, setPlayStatus] = useState(false); // Play/pause state
  const [time, setTime] = useState({ 
    currentTime: {
      second: 0,
      minute: 0
    },
    totalTime: {
      second: 0,
      minute: 0
    }
  }); // Track time (formatted)

  // Play the selected track
  const play = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setPlayStatus(true);
    }
  };

  // Pause the current track
  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setPlayStatus(false);
    }
  };

  const playWithId = (id) => {
    setTrack(songsData[id]);
  };

  const prevTrack = () => {
    const currentIndex = songsData.indexOf(track);
    const prevIndex = (currentIndex - 1 + songsData.length) % songsData.length;
    playWithId(prevIndex);
  };

  const nextTrack = () => {
    const currentIndex = songsData.indexOf(track);
    const nextIndex = (currentIndex + 1) % songsData.length;
    playWithId(nextIndex);
  };

  // Helper function to format time in minutes and seconds
  const formatTime = (timeInSeconds) => {
    if (!timeInSeconds || isNaN(timeInSeconds)) return { minute: 0, second: 0 }; // Fallback for invalid times
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return { minute: minutes, second: seconds };
  };
  
  // Update time and seek bar
  const handleTimeUpdate = () => {
    if (audioRef.current && seekBar.current && seekBg.current) {
      const currentTime = audioRef.current.currentTime;
      const duration = audioRef.current.duration || 0; // Prevent NaN for duration

      // Set formatted time
      setTime({
        currentTime: formatTime(currentTime),
        totalTime: formatTime(duration),
      });

      // Update seek bar progress
      const progress = (currentTime / duration) * 100;
      seekBar.current.style.width = `${progress}%`;
      seekBg.current.style.background = `linear-gradient(to right, #ff5722 ${progress}%, #ffffff ${progress}%)`;
    }
  };
  
  // Handle seek (user dragging the seek bar)
  const handleSeek = (e) => {
    if (audioRef.current) {
      const width = seekBg.current.clientWidth;
      const clickX = e.nativeEvent.offsetX;
      const duration = audioRef.current.duration || 0;
      audioRef.current.currentTime = (clickX / width) * duration;
    }
  };

  // Set the duration when the metadata is loaded
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setTime((prevTime) => ({
        ...prevTime,
        totalTime: formatTime(audioRef.current.duration),
      }));
    }
  };

  // Handle when the track ends
  const handleEnded = () => {
    nextTrack();
  };
  
  const playSong = (id) => {
    setTrack(songsData[id]);
    if (audioRef.current) {
      audioRef.current.play();
      setPlayStatus(true);
    }
  };

  // Effect to monitor track changes and ensure playing the new track
  useEffect(() => {
    if (track && audioRef.current) {
      audioRef.current.src = track.file;
      audioRef.current.addEventListener("loadedmetadata", handleLoadedMetadata);
      audioRef.current.addEventListener("timeupdate", handleTimeUpdate);
      audioRef.current.addEventListener('ended', handleEnded);

      // Ensure the audio starts playing after track change
      audioRef.current.oncanplaythrough = () => {
        play();
      };

      // Cleanup event listeners
      return () => {
        audioRef.current.removeEventListener("loadedmetadata", handleLoadedMetadata);
        audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);
        audioRef.current.removeEventListener('ended', handleEnded);
        audioRef.current.oncanplaythrough = null;
      };
    }
  }, [track]);

  // Context value
  const contextValue = {
    audioRef,
    seekBar,
    seekBg,
    track,
    setTrack,
    playStatus,
    setPlayStatus,
    time,
    setTime,
    play,
    pause,
    playWithId,
    handleSeek,
    handleTimeUpdate,
    nextTrack,
    prevTrack,
    playSong
  };

  return (
    <PlayContext.Provider value={contextValue}>
      {props.children}
    </PlayContext.Provider>
  );
};

export default PlayContextProvider;
