import express from 'express';
import { addAlbum,listAlbums } from '../Controllers/AlbumController.js'; // Adjust path as needed
import { albumImageUpload } from '../config/cloudinary.js'; // Adjust path as needed

const Albumrouter = express.Router();

// Route to add a new album
Albumrouter.post('/add', albumImageUpload.single('image'), addAlbum);

Albumrouter.get('/list', listAlbums);

export default Albumrouter;
