import React, { useContext, useEffect, useRef } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import DisplayHome from './DisplayHome';
import DisplayAlbum from './DisplayAlbum';
import { PlayContext } from '../Context/PlayContext';
import DisplayPlaylist from './DisplayPlaylist';

const Display = () => {
  const { albumsData } = useContext(PlayContext);
  const displayRef = useRef(null);
  const location = useLocation();

  // Extract album ID from URL path
  const isAlbum = location.pathname.includes("album");
  const albumId = isAlbum ? location.pathname.split('/').pop() : "";
  
  // Find the album
  const album = isAlbum ? albumsData.find((x) => x._id === albumId) : null;
  const bgcolor = album ? album.bgColor : "#121212";

  useEffect(() => {
    if (displayRef.current) {
      displayRef.current.style.background = `linear-gradient(${bgcolor}, #121212)`;
    }
  }, [bgcolor, isAlbum]);

  return (
    <div ref={displayRef} className='w-[100%] m-2 px-6 pt-4 rounded text-white overflow-auto lg:w-[75%] lg:ml-0'>
      <Routes>
        <Route path="/" element={<DisplayHome />} />
        <Route path="/playlist" element={<DisplayPlaylist album={album} />} />
        <Route path="/album/:id" element={<DisplayAlbum album={album} />} />
      </Routes>
    </div>
  );
};

export default Display;
