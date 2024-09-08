import pkg from 'cloudinary';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

const { v2: cloudinary } = pkg; // Destructure the 'v2' object

// Cloudinary configuration
cloudinary.config({
    cloud_name: 'dskcvks89',
    api_key: '341414854685832',
    api_secret: 'ZYu7TTgBbrjk_LFUpthDoTuPDHA',
});

// Cloudinary storage configuration for multer
const Songstorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: (req, file) => {
        let folder = 'audio'; // Default folder
        if (file.fieldname === 'song') {
            folder = 'songs'; // Specific folder for song files
        } else if (file.fieldname === 'image') {
            folder = 'imagesSongs'; // Specific folder for images
        }
        return {
            folder: folder,
            resource_type: file.fieldname === 'song' ? 'auto' : 'image', // Set resource_type based on file type
        };
    },
});

// Cloudinary storage configuration for album images
const albumImageStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: (req, file) => ({
        folder: 'imageAlbum', // Folder for album images
        resource_type: 'image',
    }),
});

const audio = multer({ storage: Songstorage });
const albumImageUpload = multer({ storage: albumImageStorage });

export { audio ,albumImageUpload};
