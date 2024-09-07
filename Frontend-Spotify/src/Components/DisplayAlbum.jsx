import React, { useContext } from 'react';
import Navbar from './Navbar';
import { useParams } from 'react-router-dom';
import { albumsData, assets, songsData } from '../assets/assets';
import { PlayContext } from '../Context/PlayContext';

const DisplayAlbum = () => {
    const { id } = useParams();
    const albumData = albumsData[id];
    const { playSong } = useContext(PlayContext); // Access playSong from context

    const handleSongClick = (index) => {
        playSong(index);
    };

    return (
        <>
            <Navbar />
            <div className='mt-10 flex gap-8 flex-col md:flex-row md:items-end'>
                <img className='w-48 rounded' src={albumData.image} alt="" />
                <div className='flex flex-col'>
                    <p>Playlist</p>
                    <b className='text-bold text-5xl mb-4 md:text-7xl'>{albumData.name}</b>
                    <h4>{albumData.desc}</h4>
                    <p className='mt-1'>
                        <img className='inline-block w-5 mr-2' src={assets.spotify_logo} alt="" />
                        <b>Spotify</b>
                        • 1,323,154 likes
                        • <b>50 songs,</b>
                        about 2 hours 30 min
                    </p>
                </div>
            </div>
            <div className='grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]'>
                <p><b className='mr-4'>#</b>Title</p>
                <p>Album</p>
                <p className='hidden sm:!block'>Data Added</p>
                <img className='m-auto w-4' src={assets.clock_icon} alt="" />
            </div>
            <hr />
            {songsData.map((item, index) => (
                <div
                    key={index}
                    className='grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer'
                    onClick={() => handleSongClick(index)} // Add click handler
                >
                    <p className='text-white'>
                        <b className='mr-4 text-[#a7a7a7]'>{index + 1}</b>
                        <img className='inline mr-5 w-10' src={item.image} alt="" />
                        {item.name}
                    </p>
                    <p className='text-[15px]'>{albumData.name}</p>
                    <p className='text-[15px] hidden sm:!block'>5 days ago</p>
                    <p className='text-[15px] text-center'>{item.duration}</p>
                </div>
            ))}
        </>
    );
};

export default DisplayAlbum;
