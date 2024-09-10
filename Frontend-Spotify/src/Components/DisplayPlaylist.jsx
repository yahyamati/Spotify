import React, { useContext, useState, useEffect } from 'react';
import Navbar from './Navbar';
import { assets } from '../assets/assets';
import { PlayContext } from '../Context/PlayContext';
import PlaylistItem from './PlaylistItem';
import ResultRechercheItem from './ResultRechercheItem';

const DisplayPlaylist = () => {
  const { filteredSongsName, searchTerm, setSearchTerm, playWithId } = useContext(PlayContext);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('Your PlayList');
  const [description, setDescription] = useState('Desc for Playlist');

  // Load the playlist title and description from localStorage on mount
  useEffect(() => {
    const savedTitle = localStorage.getItem('playlistTitle');
    const savedDescription = localStorage.getItem('playlistDescription');
    if (savedTitle) setTitle(savedTitle);
    if (savedDescription) setDescription(savedDescription);
  }, []);

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

  // Toggle edit mode
  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  // Save title and description to localStorage and exit edit mode
  const handleSaveClick = () => {
    setIsEditing(false);
    localStorage.setItem('playlistTitle', title);
    localStorage.setItem('playlistDescription', description);
  };

  return (
    <>
      <Navbar />
      <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-end">
        <img className="w-56 rounded" src={assets.Playlist} alt="Album Cover" />
        <div className="flex flex-col">
          <div className="flex items-center">
            <p className="mr-3 mb-4">Playlist</p>
            
            <button
              className="text-blue-500 hover:text-blue-700 mb-5"
              onClick={handleEditClick}
            >
              ✎
            </button>
          </div>
          {isEditing ? (
            <div className="flex flex-col text-black">
              <input
                type="text"
                className="text-3xl text-white mb-3 md:text-5xl bg-[#1F1F1F] border border-gray-600 rounded-lg focus:outline-none p-2 rounded-sm"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                type="text"
                className="text-white bg-[#1F1F1F] border border-gray-600 rounded-lg focus:outline-none p-2 rounded-sm"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <button
                className="mt-2 bg-black text-white px-4 py-2 rounded w-20"
                onClick={handleSaveClick}
              >
                Save
              </button>
            </div>
          ) : (
            <div>
              <b className="c text-3xl md:text-6xl">{title}</b>
              <h4 className="text-lg mt-3">{description}</h4>
            </div>
          )}
          <p className="mt-1">
            <img className="inline-block w-5 mr-2" src={assets.spotify_logo} alt="Spotify Logo" />
            <b>Spotify</b> 
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
              className="flex items-center p-1"
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
      <h1 className='text-bold text-3xl mt-5 mb-6'>Cherchons du contenu à ajouter à votre playlist</h1>
      <div className="flex items-center gap-3 pl-8 mt-2">
        <img className="w-6 mb-5" src={assets.search_icon} alt="Search Icon" />
        <input
          placeholder="Search..."
          className="bg-[#1F1F1F] border border-gray-600 rounded-lg py-2 px-4 w-full mb-5 max-w-xs transition-all focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-200 text-sm"
          name="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Display search results */}
      {searchTerm && (
        <div className="grid overflow-auto mt-4 mb-5">
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
