import React, { useContext } from 'react';
import { PlayContext } from '../Context/PlayContext';

const SongItem = ({ name, image, desc, id }) => {
  const { playWithId } = useContext(PlayContext);

  return (
    <div
      onClick={() => playWithId(id)}
      className="min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26] transition-colors"
    >
      <img
        src={image}
        alt={name} // Added alt text for accessibility
        className="w-full h-auto rounded" // Ensure image scales properly
      />
      <p className="font-bold mt-2 mb-1">{name}</p>
      <p className="text-slate-200 text-sm">{desc}</p>
    </div>
  );
};

export default SongItem;
