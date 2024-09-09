import React, { useContext } from "react";
import Navbar from "./Navbar";
import AlbumItem from "./AlbumItem";
import SongItem from "./SongItem";
import { PlayContext } from "../Context/PlayContext";
import Sidebar from "./Sidebar";


const DisplayHome = () => {
  const { songsData, albumsData,filteredSongsName } = useContext(PlayContext);
 
  return (
    <>
      <Navbar />
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Featured Charts</h1>
        <div className="flex overflow-auto">
          {albumsData && albumsData.length > 0 ? (
            albumsData.map((item, index) => (
              <AlbumItem
                key={index}
                name={item.name}
                desc={item.desc}
                id={item._id}
                image={item.image}
              />
            ))
          ) : (
            <p>No albums available</p>
          )}
        </div>
      </div>

      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Today's biggest hits</h1>
        <div className="flex overflow-auto">
          {songsData && songsData.length > 0 ? (
            filteredSongsName.map((cat) => (
              <SongItem
                key={cat.name}
                name={cat.name}
                desc={cat.desc}
                id={cat._id}
                image={cat.image}
              />
            ))
          ) : (
            <p>No songs available</p>
          )}
        </div>
      </div>
    </>
  );
};

export default DisplayHome;
