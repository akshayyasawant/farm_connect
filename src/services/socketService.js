import io from 'socket.io-client';

class SocketService {
    constructor() {
        this.socket = null;
    }

    connect(userId) {
        this.socket = io('http://localhost:5000', {
            auth: {
                token: localStorage.getItem('token')
            }
        });

        this.socket.on('connect', () => {
            console.log('Connected to socket server');
            this.socket.emit('join', userId);
        });

        this.socket.on('disconnect', () => {
            console.log('Disconnected from socket server');
        });

        return this.socket;
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
        }
    }

    sendMessage(message) {
        if (this.socket) {
            this.socket.emit('newMessage', message);
        }
    }

    onMessageReceived(callback) {
        if (this.socket) {
            this.socket.on('messageReceived', callback);
        }
    }

    onTyping(callback) {
        if (this.socket) {
            this.socket.on('typing', callback);
        }
    }

    emitTyping(userId, receiverId) {
        if (this.socket) {
            this.socket.emit('typing', { userId, receiverId });
        }
    }
}

export default new SocketService(); 