import express from 'express';
// import mongoose from 'mongoose'
const mongoose = require('mongoose');

// routes
import userRoutes from './routes/userRoutes';
import workspaceRoutes from './routes/workspaceRoutes';
import channelRoutes from './routes/channelRoutes';
import directChatRoutes from './routes/directChatRoutes';
import cors from 'cors'
import dotenv from 'dotenv';
dotenv.config(); 



const app = express()


app.use(cors({
    credentials: true
}));

// middlewares
app.use(express.json());

app.use('/api/users', userRoutes)
app.use('/api/workspace', workspaceRoutes)
app.use('/api/channels', channelRoutes)
app.use('/api/direct-chat', directChatRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI).then(()=>{
    app.listen(process.env.PORT, ()=>{
        console.log("Server running on port", process.env.PORT)
    })    
})
.catch((error: any)=>{
    console.log('db connect error:',error.message)
})


