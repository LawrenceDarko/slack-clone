import { Request, Response } from 'express';
import Channel from '../models/Channel';
import ChannelMessage from '../models/ChannelMessage';

const createChannel = async(req: Request, res: Response) => { 
    const newChannel = new Channel(req.body)

    try {
        const savedChannel = await newChannel.save();
        res.status(200).json(savedChannel);
    } catch (error) {
        res.status(400).json(error);
    }
    
}

const getWorkspaceChannels = async(req: Request, res: Response) => { 
    const {id} = req.params;
    const allWorkspaceChannels = await Channel.find({workspace_id: id})
    try {
        res.status(200).json(allWorkspaceChannels)
    } catch (error) {
        res.status(400).json(error)
    }
}

const createChannelMessage = async(req: Request, res: Response) => { 
    const newChannelMessage = new ChannelMessage(req.body)

    try {
        const savedChannelMessage = await newChannelMessage.save();
        res.status(200).json(savedChannelMessage);
    } catch (error) {
        res.status(400).json(error);
    }
    
}

const getChannelMessages = async(req: Request, res: Response) => { 
    const { channelId } = req.params
    const allChannelMessage = await ChannelMessage.find({channel_id: channelId})

    try {
        res.status(200).json(allChannelMessage);
    } catch (error) {
        res.status(400).json(error);
    }
    
}



export { createChannel, getWorkspaceChannels, createChannelMessage, getChannelMessages }