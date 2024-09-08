
import pkg from 'cloudinary';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import Album from '../models/AlbumModel.js';
const { v2: cloudinary } = pkg;

// For converting URL to file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const addAlbum = async (req, res) => {
  try {
    const { name, desc, bgColor } = req.body;
    const imageFile = req.file;

    // Validate required fields
    if (!name || !bgColor) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: name or background color',
      });
    }

    // Upload image file to Cloudinary if exists
    const imageUpload = imageFile ? await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' }) : null;

    const newAlbum = new Album({
      name,
      desc,
      bgColor,
      image: imageUpload ? imageUpload.secure_url : null,
    });

    const savedAlbum = await newAlbum.save();

    res.json({
      success: true,
      message: 'Album added successfully',
      data: savedAlbum,
    });
  } catch (err) {
    console.error('Error adding album:', err);
    res.status(500).json({
      success: false,
      message: 'Error adding album',
      error: err.message || err,
    });
  }
};



export const listAlbums = async (req, res) => {
    try {
        const albums = await Album.find(); // Fetch all albums from the database
        res.json({
            success: true,
            data: albums,
        });
    } catch (err) {
        console.error('Error fetching albums:', err);
        res.status(500).json({
            success: false,
            message: 'Error fetching albums',
            error: err.message || err,
        });
    }
};
