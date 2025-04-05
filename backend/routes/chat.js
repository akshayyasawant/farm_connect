const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const auth = require('../middleware/auth');

// Get all messages between a buyer and a specific farmer
router.get('/:farmerId', auth, async (req, res) => {
    try {
        const messages = await Message.find({
            $or: [
                { senderId: req.user._id, receiverId: req.params.farmerId },
                { senderId: req.params.farmerId, receiverId: req.user._id }
            ]
        }).sort({ timestamp: 1 });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Send a new message
router.post('/', auth, async (req, res) => {
    try {
        const message = new Message({
            content: req.body.content,
            sender: 'buyer',
            senderId: req.user._id,
            receiverId: req.body.receiver
        });
        const newMessage = await message.save();
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Mark messages as read
router.put('/read/:farmerId', auth, async (req, res) => {
    try {
        await Message.updateMany(
            {
                senderId: req.params.farmerId,
                receiverId: req.user._id,
                read: false
            },
            { read: true }
        );
        res.json({ message: 'Messages marked as read' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get unread message count
router.get('/unread/count', auth, async (req, res) => {
    try {
        const count = await Message.countDocuments({
            receiverId: req.user._id,
            read: false
        });
        res.json({ count });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router; 