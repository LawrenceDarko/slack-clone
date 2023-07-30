import express from 'express';
// import mongoose from 'mongoose'
const mongoose = require('mongoose');

// routes
import userRoutes from './routes/userRoutes';
import workspaceRoutes from './routes/workspaceRoutes';
import channelRoutes from './routes/channelRoutes';
import directChatRoutes from './routes/directChatRoutes';
import cors from 'cors'
// import { protect } from './middleware/authMiddleware';
import protect from './middleware/authMiddleware';
import dotenv from 'dotenv';
dotenv.config(); 



const app = express()


app.use(cors({
    credentials: true
}));

// middlewares
app.use(express.json());

app.use('/api/users', userRoutes)
app.use('/api/workspace', protect, workspaceRoutes)
app.use('/api/channels', protect, channelRoutes)
app.use('/api/direct-chat', protect, directChatRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI).then(()=>{
    app.listen(process.env.PORT, ()=>{
        console.log("Server running on port", process.env.PORT)
    })    
})
.catch((error: any)=>{
    console.log('db connect error:',error.message)
})


