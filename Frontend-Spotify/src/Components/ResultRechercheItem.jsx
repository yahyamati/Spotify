import React from 'react';

const ResultRechercheItem = ({ name, image, dur, id }) => {
  return (
    <div className='grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer'>
      <p className='text-white flex items-center'>  
        <img className='inline mr-5 w-10' src={image} alt={name} />
        {name}
      </p>
      <p className='text-[15px] hidden sm:!block'>Playlist</p>
      <p className='text-[15px] hidden sm:!block'>1 day ago</p>
      <p className='text-[15px] text-center '>{dur}</p>
   
    </div>
  );
};

export default ResultRechercheItem;
