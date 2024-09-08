import express from "express"
import cors from "cors"
import dotenv from 'dotenv';
import  {connectDB} from "./config/db.js"
import Songroute from "./routes/SongRoute.js";
import Albumrouter from "./routes/AlbumRoute.js";



//app config
const app = express()
const port = process.env.PORT||5000


//middleware
app.use(express.json())//we can parsing to json 
app.use(cors())//we can access backend for any frontend


// db connection 
connectDB();


//api endpoints
app.use('/api/song',Songroute)
app.use('/api/album',Albumrouter)




app.get("/",(req,res)=>{
    res.send("API Working")
})


app.listen(port , ()=> {
    console.log(`Server is running on http://localhost:${port}`)
})
