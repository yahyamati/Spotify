import React, { useContext, useState, useEffect } from 'react';
import Navbar from './Navbar';
import { assets } from '../assets/assets';
import { PlayContext } from '../Context/PlayContext';
import PlaylistItem from './PlaylistItem';
import ResultRechercheItem from './ResultRechercheItem';

const DisplayPlaylist = () => {
    const { filteredSongsName, songsData, searchTerm, setSearchTerm } = useContext(PlayContext);
    const [showAdditionalItems, setShowAdditionalItems] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);

    // Load the state from localStorage on component mount
    useEffect(() => {
        const storedShowAdditionalItems = localStorage.getItem('showAdditionalItems');
        if (storedShowAdditionalItems !== null) {
            setShowAdditionalItems(JSON.parse(storedShowAdditionalItems));
        }

        const storedSelectedItems = localStorage.getItem('selectedItems');
        if (storedSelectedItems !== null) {
            setSelectedItems(JSON.parse(storedSelectedItems));
        }
    }, []);

    // Save the state to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('showAdditionalItems', JSON.stringify(showAdditionalItems));
        localStorage.setItem('selectedItems', JSON.stringify(selectedItems));
    }, [showAdditionalItems, selectedItems]);

    const handleAddClick = (id) => {
        setShowAdditionalItems(true);
        setSearchTerm('');
        setSelectedItems(prevItems => {
            const newItems = [...prevItems, id];
            // Remove duplicate IDs
            const uniqueItems = [...new Set(newItems)];
            localStorage.setItem('selectedItems', JSON.stringify(uniqueItems));
            return uniqueItems;
        });
    };

    return (
        <>
            <Navbar />
            <div className='mt-10 flex gap-8 flex-col md:flex-row md:items-end'>
                <img className='w-56 rounded' src={assets.Playlist} alt="Album Cover" />
                <div className='flex flex-col'>
                    <p>Playlist</p>
                    <b className='text-bold text-5xl mb-4 md:text-7xl'>YourPlayList</b>
                    <h4>Desc for Playlist</h4>
                    <p className='mt-1'>
                        <img className='inline-block w-5 mr-2' src={assets.spotify_logo} alt="Spotify Logo" />
                        <b>Spotify</b> • 1,323,154 likes • <b>50 songs</b>, about 2 hours 30 min
                    </p>
                </div>
            </div>
            <div className='grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]'>
                <p><b className='mr-4'>#</b>Title</p>
                <p className='hidden sm:!block'>Album</p>
                <p className='hidden sm:!block'>Date Added</p>
                <img className='m-auto w-4' src={assets.clock_icon} alt="Clock Icon" />
            </div>

            {selectedItems.length > 0 && (
                <div className="grid overflow-auto mt-5">
                    {selectedItems.map(id => {
                        const item = songsData.find(song => song._id === id);
                        return item ? (
                            <ResultRechercheItem
                                key={item._id}
                                name={item.name}
                                id={item._id}
                                image={item.image}
                                dur={item.duration}
                            />
                        ) : null;
                    })}
                </div>
            )}

            <input
                placeholder="Search..."
                className="bg-gray-100 border border-gray-300 rounded-lg py-2 px-4 w-full max-w-xs transition-all focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-700"
                name="search"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />

            {searchTerm && (
                <div className="grid overflow-auto mt-4">
                    {songsData && songsData.length > 0 ? (
                        filteredSongsName.map((cat) => (
                            <PlaylistItem
                                key={cat._id}
                                name={cat.name}
                                id={cat._id}
                                image={cat.image}
                                dur={cat.duration}
                                onAdd={handleAddClick}
                            />
                        ))
                    ) : (
                        <p>No songs available</p>
                    )}
                </div>
            )}
        </>
    );
};

export default DisplayPlaylist;
