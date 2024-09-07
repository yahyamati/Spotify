// Player.jsx
import React, { useContext } from 'react';
import { PlayContext } from '../Context/PlayContext';
import { assets } from '../assets/assets';

const Player = () => {
  // Access context
  const {
    track,
    playStatus,
    play,
    pause,
    time,
    handleSeek,
    seekBar,
    seekBg,
    audioRef,
    prevTrack,
    nextTrack
  } = useContext(PlayContext);

  return (
    <div className="h-[10%] bg-black flex justify-between items-center text-white px-4">
      {/* Track Info */}
      <div className="hidden lg:!flex items-center gap-4">
        <img className="w-12" src={track.image} alt="Track Icon" />
        <div>
          <p>{track.name}</p>
          <p>{track.desc.slice(0, 12)}</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center gap-1 m-auto">
        <div className="flex gap-4">
          <img
            className="w-4 cursor-pointer"
            src={assets.shuffle_icon}
            alt="Shuffle Icon"
          />
          <img
            className="w-4 cursor-pointer"
            src={assets.prev_icon}
            alt="Previous Icon"
            onClick={prevTrack}
          />
          {/* Play/Pause Button */}
          <img
            className="w-4 cursor-pointer"
            src={playStatus ? assets.pause_icon : assets.play_icon}
            alt="Play/Pause Icon"
            onClick={playStatus ? pause : play}
          />
          <img
            className="w-4 cursor-pointer"
            src={assets.next_icon}
            alt="Next Icon"
            onClick={nextTrack}
          />
          <img
            className="w-4 cursor-pointer"
            src={assets.loop_icon}
            alt="Loop Icon"
          />
        </div>
        <div className="flex items-center gap-5">
          {/* Current Time */}
          <p>{`${time.currentTime.minute}:${time.currentTime.second < 10 ? '0' : ''}${time.currentTime.second}`}</p>

          {/* Seek Bar */}
          <div
            ref={seekBg}
            className="w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer"
            onClick={handleSeek}
          >
            <div
              ref={seekBar}
              className="h-1 bg-green-800 rounded-full"
              style={{ width: `${(audioRef.current?.currentTime / audioRef.current?.duration) * 100 || 0}%` }}
            ></div>
          </div>

          {/* Total Duration */}
          <p>{`${time.totalTime.minute}:${time.totalTime.second < 10 ? '0' : ''}${time.totalTime.second}`}</p>
        </div>
      </div>

      {/* Additional Controls */}
      <div className="hidden lg:!flex items-center gap-2 opacity-75">
        <img className="w-4 cursor-pointer" src={assets.play_icon} alt="Play Icon" />
        <img className="w-4 cursor-pointer" src={assets.mic_icon} alt="Mic Icon" />
        <img className="w-4 cursor-pointer" src={assets.queue_icon} alt="Queue Icon" />
        <img className="w-4 cursor-pointer" src={assets.speaker_icon} alt="Speaker Icon" />
        <img className="w-4 cursor-pointer" src={assets.volume_icon} alt="Volume Icon" />
        <div className="w-20 bg-slate-50 h-1 rounded"></div>
        <img className="w-4 cursor-pointer" src={assets.mini_player_icon} alt="Mini Player Icon" />
        <img className="w-4 cursor-pointer" src={assets.zoom_icon} alt="Zoom Icon" />
      </div>
    </div>
  );
};

export default Player;
