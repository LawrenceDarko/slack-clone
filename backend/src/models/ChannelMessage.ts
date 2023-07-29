import mongoose from 'mongoose';

const ChannelMessageSchema = new mongoose.Schema({
    sender_id: { type: String},
    channel_id: { type: String },
    message_body: { type: String },
}, {timestamps: true});

const ChannelMessage = mongoose.model('ChannelMessage', ChannelMessageSchema);

export default ChannelMessage;
