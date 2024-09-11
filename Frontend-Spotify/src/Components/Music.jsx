import React, { useContext } from "react";
import { PlayContext } from "../Context/PlayContext";
import SongItem from "./SongItem";
import Navbar from "./Navbar";

const Music = () => {
  const { songsData, filteredSongsName } = useContext(PlayContext);

  return (
    <>
      <Navbar />
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">All Music</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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

export default Music;
