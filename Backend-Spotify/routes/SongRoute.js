import express from 'express';
import { audio } from '../config/cloudinary.js'; 
import { addSong,listSongs } from '../Controllers/SongController.js';

const Songroute = express.Router();

Songroute.post('/add', audio.fields([{ name: 'song', maxCount: 1 }, { name: 'image', maxCount: 1 }]), addSong);
Songroute.get('/list', listSongs);

export default Songroute;
