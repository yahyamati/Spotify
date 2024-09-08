// models/AlbumModel.js
import mongoose from 'mongoose';

const albumSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String, // URL of the cover image
    required: false 
  },
  desc: {
    type: String,
    required: false 
  },
  bgColor: {
    type: String,
    required: false 
  },
});

const Album = mongoose.model('Album', albumSchema);

export default Album;
