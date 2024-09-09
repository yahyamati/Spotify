import axios from "axios";
import { createContext, useEffect, useRef, useState } from "react";

// Create the context
export const PlayContext = createContext(null);

const PlayContextProvider = (props) => {
  // References
  const audioRef = useRef(null);
  const seekBar = useRef(null);
  const seekBg = useRef(null);

  // State
  const [songsData, setSongsData] = useState([]);
  const [albumsData, setAlbumsData] = useState([]);
  const [track, setTrack] = useState(null); // Current track
  const [playStatus, setPlayStatus] = useState(false); // Play/pause state
  // for search
  const [searchTerm, setSearchTerm] =useState('');
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


//search function
  const filteredSongsName = songsData.filter((cat) => {
        
    if (searchTerm === "") {
      return cat;
    } else if (cat.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return cat;
    }
  });



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

  const playWithId = async (id) => {
    await songsData.map((item)=>{
      if(item._id === id){
        setTrack(item);
      }

    })
    await audioRef.current.play();
    setPlayStatus(true);
  };

  const prevTrack = () => {
   songsData.map(async(item,index)=>{
    if(track._id===item._id && index>0){
       await setTrack(songsData[index-1]);
       await audioRef.current.play();
       setPlayStatus(true)
    }
   })
  };


  const nextTrack = () => {
    songsData.forEach(async (item, index) => {
      if (track._id === item._id) {
        if (index < songsData.length - 1) {
          // Move to the next track
          await setTrack(songsData[index + 1]);
        } else {
          // If it's the last track, move to the first track
          await setTrack(songsData[0]);
        }
        await audioRef.current.play();
        setPlayStatus(true);
      }
    });
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

  

  const getSongData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/song/list'); // Adjust the URL based on your backend
      
      // Check the response structure and access the songs array correctly
      if (response.data && response.data.success && Array.isArray(response.data.data)) {
        const songs = response.data.data;
        setSongsData(songs);
        // Set the first song if available
        if (songs.length > 0) {
          setTrack(songs[0]);
        } else {
          // Handle the case where there are no songs
          console.warn('No songs found in the response.');
          setTrack(null);
        }
      } else {
        console.error('Unexpected response structure:', response.data);
      }
    } catch (error) {
      console.error('Error fetching songs:', error);
    }
  };
  
  

  const getAlbumData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/album/list'); // Adjust the URL based on your backend
      
      // Check the response structure and handle the data correctly
      if (response.data && response.data.success && Array.isArray(response.data.data)) {
        const albums = response.data.data;
        setAlbumsData(albums);
      } else {
        console.error('Unexpected response structure:', response.data);
      }
    } catch (error) {
      console.error('Error fetching albums:', error);
    }
  };

  useEffect(() => {
    getSongData();
    getAlbumData();
  }, []);

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
    songsData,
    albumsData,
    filteredSongsName,
    searchTerm,
    setSearchTerm
  };

  return (
    <PlayContext.Provider value={contextValue}>
      {props.children}
    </PlayContext.Provider>
  );
};

export default PlayContextProvider;
