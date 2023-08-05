import { Request, Response } from 'express';
import DirectChat from '../models/DirectChat';
import DirectMessage from '../models/DirectMessage';

const createDirectChat = async(req: Request, res: Response) => {
    
    const existingDirectChat = await DirectChat.findOne(req.body)

    if(existingDirectChat){
        return res.status(401).json('Can create')
    }

    const newDirectChat = new DirectChat(req.body)

    try {
        const savedDirectChat = await newDirectChat.save();
        res.status(200).json(savedDirectChat);
    } catch (error) {
        res.status(400).json(error);
    }
    
}

const getADirectChatObj = async(req: Request, res: Response) => {
    const {senderId, receiverId} = req.params
    const directChatObj = await DirectChat.findOne({
        members: {$all: [senderId, receiverId]}
    })

    try {
        res.status(200).json(directChatObj)
    } catch (error) {
        res.status(400).json(error)
    }
}

const createDirectMessage = async(req: Request, res: Response) => { 
    const newDirectMessage = new DirectMessage(req.body)

    try {
        const savedDirectMessage = await newDirectMessage.save();
        res.status(200).json(savedDirectMessage);
    } catch (error) {
        res.status(400).json(error);
    }
    
}

const getDirectChatMessages = async(req: Request, res: Response) => { 
    const { directId } = req.params
    const allDirectMessage = await DirectMessage.find({direct_chat_id: directId})

    try {
        res.status(200).json(allDirectMessage);
    } catch (error) {
        res.status(400).json(error);
    }
    
}



export {createDirectChat, 
        createDirectMessage, 
        getDirectChatMessages, 
        getADirectChatObj
    }