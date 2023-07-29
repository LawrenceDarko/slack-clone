import express from 'express'
import { createChannel, getWorkspaceChannels, createChannelMessage, getChannelMessages } from '../controllers/channelController';

const router = express.Router();

// Create a Channel
router.post('/create', createChannel)

// Fetch Workspace Channels
router.get('/workspace-channels/:id', getWorkspaceChannels)

// Create Channel Message
router.post('/message', createChannelMessage )

// Fetches all messages belonging to a Channel
router.get('/:channelId', getChannelMessages )


export default router