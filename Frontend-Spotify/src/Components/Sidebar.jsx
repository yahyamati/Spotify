import React, { useState,useContext } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { PlayContext } from "../Context/PlayContext";
import SongItem from "./SongItem";

const Sidebar = () => {
  const navigate = useNavigate();
  const { searchTerm,setSearchTerm } = useContext(PlayContext);
 



    
  
  return (
    <div className="w-[25%] h-full p-2 flex-col gap-2 text-white hidden lg:!flex">
      <div className="bg-[#121212] h-[15%] rounded flex flex-col justify-around">
        <div onClick={()=>navigate('/')} className="flex items-center gap-3 pl-8 cursor-pointer">
          <img className="w-6" src={assets.home_icon} alt="Home Icon" />
          <p className="font-bold ">Home</p>
        </div>
        <div className="flex items-center gap-3 pl-8 cursor-pointer">
          <img className="w-6" src={assets.search_icon} alt="Search Icon" />
          <input
          placeholder="Search..."
          className="bg-gray-100 border border-gray-300 rounded-lg py-2 px-4 w-full max-w-xs transition-all focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-700"        
          name="search"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)} 
        />
        </div>
        
   
    
      </div>
      <div className="bg-[#121212] h-[85%] rounded">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img className="w-8" src={assets.stack_icon} alt="Stack Icon" />
            <p className="font-semibold">Your Library</p>
          </div>
          <div className="flex items-center gap-3 ">
            <img className="w-5" src={assets.arrow_icon} alt="" />
            <img className="w-5" src={assets.plus_icon} alt="" />

          </div>
        </div>
        <div className="p-4 bg-[#242424] flex flex-col m-2 rounded font-semibold items-start justify-start gap-1 pl-4">
           
            <h1>Create your first playlist</h1>
            <p className="font-light">it's easy we will help you </p>
            <button onClick={()=>navigate('/playlist')} className="px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4">Create Playlist</button>
            
        </div>
        <div className="p-4 bg-[#242424] flex flex-col m-2 rounded font-semibold items-start justify-start gap-1 pl-4 mt-4">
           
           <h1>Let's find some podcasts to follow</h1>
           <p className="font-light">we'll keep you update on new episodes </p>
           <button className="px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4">Browse podcasts</button>
           
       </div>
      </div>
    </div>
  );
};

export default Sidebar;

