import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import user from './Router/user.router.js'
import connectionDB from './Database/db.js';

dotenv.config()
const app=express();
app.use(cors())
app.use(express.json())
const port=process.env.PORT 
app.use('/api',user)
app.get('/',(req,res)=>{
    res.status(200).json("api is working")
})
connectionDB()
app.listen(port,()=>{
    console.log("App is running on the port",port);
})