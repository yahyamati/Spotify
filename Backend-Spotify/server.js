import express from "express"
import cors from "cors"
import dotenv from 'dotenv';
//import  {connectDB} from "./config/db.js"



//app config
const app = express()
const port = process.env.PORT||3000


//middleware
app.use(express.json())//we can parsing to json 
app.use(cors())//we can access backend for any frontend


// db connection 
//connectDB();


//api endpoints




app.get("/",(req,res)=>{
    res.send("API Working")
})


app.listen(port , ()=> {
    console.log(`Server is running on http://localhost:${port}`)
})
