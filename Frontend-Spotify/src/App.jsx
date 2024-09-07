import React, { useContext, useEffect } from 'react';
import Sidebar from './Components/Sidebar';
import Player from './Components/Player';
import Display from './Components/Display';
import { PlayContext } from './Context/PlayContext'; 

const App = () => {
  const { audioRef } = useContext(PlayContext);



  return (
    <div className='h-screen bg-black'>
      <div className='h-[90%] flex'>
        <Sidebar />
        <Display />
      </div>
      
      <Player />
      {/* Connect the audio element to the context */}
      <audio ref={audioRef} preload='auto'></audio>
    </div>
  );
};

export default App;
