const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const chatRoutes = require('./routes/chat');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/messages', chatRoutes);

// Socket.IO connection handling
io.on('connection', (socket) => {
    console.log('New client connected');

    // Join a room based on user ID
    socket.on('join', (userId) => {
        socket.join(userId);
        console.log(`User ${userId} joined their room`);
    });

    // Handle new messages
    socket.on('newMessage', async (message) => {
        try {
            // Emit to the receiver's room
            io.to(message.receiverId).emit('messageReceived', message);
            console.log('Message sent to receiver:', message.receiverId);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/farmconnect', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 