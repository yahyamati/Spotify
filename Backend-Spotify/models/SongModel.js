import mongoose from 'mongoose';

const SongSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: false },
    file: { type: String, required: true },
    desc: { type: String, required: false },
    album: { type: String, required: false },
    duration: { type: String, required: true }
}, {
    timestamps: true // Optional: Adds timestamps for creation and updates
});

const SongModel = mongoose.models.song || mongoose.model('Song', SongSchema);

export default SongModel;
