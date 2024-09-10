import React, { useContext, useState, useEffect } from 'react';
import Navbar from './Navbar';
import { assets } from '../assets/assets';
import { PlayContext } from '../Context/PlayContext';
import PlaylistItem from './PlaylistItem';
import ResultRechercheItem from './ResultRechercheItem';

const DisplayPlaylist = () => {
  const { filteredSongsName, searchTerm, setSearchTerm, playWithId } = useContext(PlayContext);
  const [selectedItems, setSelectedItems] = useState([]);

  // Load the selected items from localStorage on mount
  useEffect(() => {
    const savedItems = localStorage.getItem('selectedPlaylist');
    if (savedItems) {
      setSelectedItems(JSON.parse(savedItems));
    }
  }, []);

  // Add the entire song object and save to localStorage
  const handleAddClick = (song) => {
    setSearchTerm('');
    setSelectedItems((prevItems) => {
      const newItems = [...prevItems, song];
      // Remove duplicates based on _id
      const uniqueItems = newItems.filter(
        (item, index, self) => index === self.findIndex((t) => t._id === item._id)
      );
      // Save the uniqueItems to localStorage
      localStorage.setItem('selectedPlaylist', JSON.stringify(uniqueItems));
      return uniqueItems;
    });
  };

  // Remove an item from selectedItems and localStorage
  const handleRemoveClick = (id) => {
    setSelectedItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item._id !== id);
      localStorage.setItem('selectedPlaylist', JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  return (
    <>
      <Navbar />
      <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-end">
        <img className="w-56 rounded" src={assets.Playlist} alt="Album Cover" />
        <div className="flex flex-col">
          <p>Playlist</p>
          <b className="text-bold text-5xl mb-4 md:text-7xl">Your PlayList</b>
          <h4>Desc for Playlist</h4>
          <p className="mt-1">
            <img className="inline-block w-5 mr-2" src={assets.spotify_logo} alt="Spotify Logo" />
            <b>Spotify</b> • 1,323,154 likes • <b>50 songs</b>, about 2 hours 30 min
          </p>
        </div>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7] ml-3">
        <p><b className="mr-4">#</b>Title</p>
        <p className="hidden sm:!block">Album</p>
        <p className="hidden sm:!block">Date Added</p>
        <img className="m-auto w-4" src={assets.clock_icon} alt="Clock Icon" />
      </div>

      {selectedItems.length > 0 && (
        <div className="grid gap-2 mt-5">
          {selectedItems.map((song) => (
            <div
              key={song._id}
              className="flex items-center p-1 "
            >
              <button
                className="text-red-500 hover:text-red-700 text-xl font-bold mr-4"
                onClick={(e) => {
                  e.stopPropagation(); 
                  handleRemoveClick(song._id);
                }}
              >
                ×
              </button>
              <div
                className="flex-1 cursor-pointer"
                onClick={() => {
                  console.log('Song ID:', song._id); 
                  playWithId(song._id); 
                }}
              >
                <ResultRechercheItem
                  name={song.name}
                  id={song._id}
                  image={song.image}
                  dur={song.duration}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Search bar */}
      <input
        placeholder="Search..."
        className="bg-gray-100 border border-gray-300 mt-5 rounded-lg py-2 px-4 w-full max-w-xs transition-all focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-700"
        name="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Display search results */}
      {searchTerm && (
        <div className="grid overflow-auto mt-4">
          {filteredSongsName.map((song) => (
            <PlaylistItem
              key={song._id}
              name={song.name}
              id={song._id}
              image={song.image}
              dur={song.duration}
              onAdd={() => handleAddClick(song)} // Correctly pass the full song object to handleAddClick
            />
          ))}
        </div>
      )}
    </>
  );
};

export default DisplayPlaylist;
