import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://yahyamati:yahya123@cluster0.iqu5y.mongodb.net/Spotify-app').then(()=>console.log("DB Connected"));

}