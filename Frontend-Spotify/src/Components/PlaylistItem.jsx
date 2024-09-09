import React from 'react';

const PlaylistItem = ({ name, image, dur, id, onAdd }) => {
  return (
    <div className='grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer'>
      <p className='text-white flex items-center'>
        <b className='mr-4 text-[#a7a7a7]'>1</b>
        <img className='inline mr-5 w-10' src={image} alt={name} />
        {name}
      </p>
     
     
      <button
        onClick={() => onAdd(id)}
        className='col-span-1 px-2 py-1 bg-black w-20 text-white text-xs rounded-full hover:bg-black'
      >
        Add
      </button>
    </div>
  );
};

export default PlaylistItem;
