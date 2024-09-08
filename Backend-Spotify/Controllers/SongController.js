import pkg from 'cloudinary';
import fs from 'fs';
import path from 'path';
import { parseFile } from 'music-metadata';
import axios from 'axios';
import { fileURLToPath } from 'url'; // For converting URL to file path
import Song from '../models/SongModel.js';

const { v2: cloudinary } = pkg;

const formatDuration = (durationInSeconds) => {
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = Math.floor(durationInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const addSong = async (req, res) => {
    try {
        const { name, desc,album } = req.body;
        const songFile = req.files && req.files.song ? req.files.song[0] : null;
        const imageFile = req.files && req.files.image ? req.files.image[0] : null;

        // Validate required fields
        if (!name || !songFile) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields: name or song file',
            });
        }

        // Upload song file to Cloudinary
        const songUpload = await cloudinary.uploader.upload(songFile.path, { resource_type: 'auto' });
        const songUrl = songUpload.secure_url;

        // Download the song file to a temporary location
        const tempDir = path.join(__dirname, 'temp');
        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir);
        }
        const tempFilePath = path.join(tempDir, 'temp_song.mp3'); // Adjust path as needed
        const writer = fs.createWriteStream(tempFilePath);

        const response = await axios({
            url: songUrl,
            method: 'GET',
            responseType: 'stream',
        });

        response.data.pipe(writer);

        // Wait until the file is fully downloaded
        await new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });

        // Extract duration from the temporary file
        const metadata = await parseFile(tempFilePath);
        const durationInSeconds = metadata.format.duration || 0;
        const formattedDuration = formatDuration(durationInSeconds);

        // Delete the temporary file
        fs.unlinkSync(tempFilePath);

        // Upload image file to Cloudinary if exists
        const imageUpload = imageFile ? await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' }) : null;

        const newSong = new Song({
            name,
            desc,
            album,
            duration: formattedDuration,
            file: songUrl,
            image: imageUpload ? imageUpload.secure_url : null,
        });

        const savedSong = await newSong.save();

        res.json({
            success: true,
            message: 'Song added successfully',
            data: savedSong,
        });
    } catch (err) {
        console.error('Error adding song:', err);
        res.status(500).json({
            success: false,
            message: 'Error adding song',
            error: err.message || err,
        });
    }
};


export const listSongs = async (req, res) => {
    try {
        const songs = await Song.find(); // Fetch all songs from the database
        res.json({
            success: true,
            data: songs,
        });
    } catch (err) {
        console.error('Error fetching songs:', err);
        res.status(500).json({
            success: false,
            message: 'Error fetching songs',
            error: err.message || err,
        });
    }
};