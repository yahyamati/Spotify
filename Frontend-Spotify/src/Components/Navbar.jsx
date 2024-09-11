import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // To get the current location
  const [activeTab, setActiveTab] = useState('');

  useEffect(() => {
    // Update active tab based on the current route
    switch (location.pathname) {
      case '/':
        setActiveTab('all');
        break;
      case '/music':
        setActiveTab('music');
        break;
      case '/podcasts':
        setActiveTab('podcasts');
        break;
      default:
        setActiveTab('all');
    }
  }, [location.pathname]);

  const handleTabClick = (tabName, route) => {
    setActiveTab(tabName); // Set clicked tab as active
    navigate(route); // Navigate to the respective route
  };

  return (
    <>
      <div className="w-full flex justify-between items-center font-semibold">
        <div className="flex items-center gap-2">
          <img
            onClick={() => navigate(-1)}
            className="w-8 bg-black rounded-2xl p-2 cursor-pointer"
            src={assets.arrow_left}
            alt="Go Back"
          />
          <img
            onClick={() => navigate(1)}
            className="w-8 bg-black rounded-2xl p-2 cursor-pointer"
            src={assets.arrow_right}
            alt="Go Forward"
          />
        </div>

        <div className="flex items-center gap-4">
          <p className="px-4 py-1.5 bg-white text-[15px] text-black rounded-2xl hidden md:!block cursor-pointer">
            Explore Premium
          </p>
          <a
            href="https://play.google.com/store/apps/details?id=com.spotify.music&hl=en"
            target="_blank"
            className="px-4 py-1.5 bg-black text-[15px] text-white rounded-2xl cursor-pointer"
            rel="noopener noreferrer"
          >
            Install App
          </a>
          <p className="rounded-full bg-purple-500 text-black w-7 h-7 flex items-center justify-center text-center">
            Y
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 my-4">
        <p
          onClick={() => handleTabClick('all', '/')}
          className={`px-4 py-1.5 rounded-2xl cursor-pointer transition-colors duration-300 ${
            activeTab === 'all' ? 'bg-white text-black' : 'bg-black text-white'
          }`}
        >
          All
        </p>
        <p
          onClick={() => handleTabClick('music', '/music')}
          className={`px-4 py-1.5 rounded-2xl cursor-pointer transition-colors duration-300 ${
            activeTab === 'music' ? 'bg-white text-black' : 'bg-black text-white'
          }`}
        >
          Music
        </p>
        <p
          onClick={() => handleTabClick('podcasts', '')}
          className={`px-4 py-1.5 rounded-2xl cursor-pointer transition-colors duration-300 ${
            activeTab === 'podcasts' ? 'bg-white text-black' : 'bg-black text-white'
          }`}
        >
          Podcasts
        </p>
      </div>
    </>
  );
};

export default Navbar;
