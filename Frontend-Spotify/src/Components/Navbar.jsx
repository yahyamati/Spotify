import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Navbar = () => {

  const navigate = useNavigate();

  return (
    <>
      <div className="w-full flex justify-between items-center font-semibold">
        <div className="flex items-center gap-2">
          <img onClick={()=>navigate(-1)}
            className="w-8 bg-black rounded-2xl p-2 cursor-pointer"
            src={assets.arrow_left}
            alt=""
          />
          <img onClick={()=>navigate(1)}
            className="w-8 bg-black rounded-2xl p-2 cursor-pointer"
            src={assets.arrow_right}
            alt=""
          />
        </div>

        <div className="flex items-center gap-4">
          <p className="px-4 py-1.5 bg-white text-[15px] text-black rounded-2xl hidden md:!block cursor-pointer">
            Explore Premium
          </p>
          <a href="https://play.google.com/store/apps/details?id=com.spotify.music&hl=en" target="_blank" className="px-4 py-1.5 bg-black text-[15px] text-white rounded-2xl cursor-pointer">
            Install App
          </a>
          <p className="rounded-full bg-purple-500 text-black w-7 h-7 flex items-center justify-center text-center">
            Y
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 my-4">
        <p className="px-4 py-1.5 bg-white text-[15px] text-black rounded-2xl cursor-pointer">
          All
        </p>
        <p className="px-4 py-1.5 bg-black text-[15px] text-white rounded-2xl cursor-pointer">
          Music
        </p>
        <p className="px-4 py-1.5 bg-black text-[15px] text-white rounded-2xl cursor-pointer">
          Podcasts
        </p>
      </div>
    </>
  );
};

export default Navbar;
