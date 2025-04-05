import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faTimes, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import socketService from '../services/socketService';
import './ChatWindow.css';

const ChatWindow = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [selectedFarmer, setSelectedFarmer] = useState(null);
    const [farmers, setFarmers] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const [typingTimeout, setTypingTimeout] = useState(null);
    const messagesEndRef = useRef(null);
    const buyer = JSON.parse(localStorage.getItem('buyer'));

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        // Connect to socket when component mounts
        if (buyer && buyer._id) {
            socketService.connect(buyer._id);

            // Listen for new messages
            socketService.onMessageReceived((message) => {
                if (selectedFarmer && message.senderId === selectedFarmer._id) {
                    setMessages(prev => [...prev, message]);
                }
            });

            // Listen for typing indicators
            socketService.onTyping(({ userId }) => {
                if (selectedFarmer && userId === selectedFarmer._id) {
                    setIsTyping(true);
                    if (typingTimeout) clearTimeout(typingTimeout);
                    const timeout = setTimeout(() => setIsTyping(false), 3000);
                    setTypingTimeout(timeout);
                }
            });
        }

        // Cleanup on unmount
        return () => {
            socketService.disconnect();
            if (typingTimeout) clearTimeout(typingTimeout);
        };
    }, [buyer, selectedFarmer]);

    useEffect(() => {
        // Fetch farmers list when component mounts
        const fetchFarmers = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/farmers');
                if (response.ok) {
                    const data = await response.json();
                    setFarmers(data);
                }
            } catch (error) {
                console.error('Error fetching farmers:', error);
            }
        };

        fetchFarmers();
    }, []);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !selectedFarmer) return;

        const messageData = {
            content: newMessage,
            sender: 'buyer',
            senderId: buyer._id,
            receiverId: selectedFarmer._id,
            timestamp: new Date().toISOString()
        };

        try {
            const response = await fetch('http://localhost:5000/api/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(messageData)
            });

            if (response.ok) {
                const savedMessage = await response.json();
                setMessages(prev => [...prev, savedMessage]);
                setNewMessage('');
                // Emit message through socket
                socketService.sendMessage(savedMessage);
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const handleTyping = () => {
        if (selectedFarmer) {
            socketService.emitTyping(buyer._id, selectedFarmer._id);
        }
    };

    const handleFarmerSelect = async (farmer) => {
        setSelectedFarmer(farmer);
        try {
            const response = await fetch(`http://localhost:5000/api/messages/${farmer._id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setMessages(data);
                // Mark messages as read
                await fetch(`http://localhost:5000/api/messages/read/${farmer._id}`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
            }
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    return (
        <div className="chat-container">
            {!isOpen ? (
                <button className="chat-toggle-button" onClick={() => setIsOpen(true)}>
                    <FontAwesomeIcon icon={faComments} />
                </button>
            ) : (
                <div className="chat-window">
                    <div className="chat-header">
                        <h3>Chat with Farmers</h3>
                        <button className="close-button" onClick={() => setIsOpen(false)}>
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                    </div>
                    
                    <div className="chat-content">
                        <div className="farmers-list">
                            {farmers.map((farmer) => (
                                <div
                                    key={farmer._id}
                                    className={`farmer-item ${selectedFarmer?._id === farmer._id ? 'selected' : ''}`}
                                    onClick={() => handleFarmerSelect(farmer)}
                                >
                                    <img src={farmer.profileImage || '/default-avatar.png'} alt={farmer.name} />
                                    <span>{farmer.name}</span>
                                </div>
                            ))}
                        </div>

                        <div className="messages-container">
                            {selectedFarmer ? (
                                <>
                                    <div className="messages">
                                        {messages.map((message, index) => (
                                            <div
                                                key={index}
                                                className={`message ${message.sender === 'buyer' ? 'sent' : 'received'}`}
                                            >
                                                {message.content}
                                            </div>
                                        ))}
                                        {isTyping && (
                                            <div className="typing-indicator">
                                                {selectedFarmer.name} is typing...
                                            </div>
                                        )}
                                        <div ref={messagesEndRef} />
                                    </div>
                                    <form className="message-input" onSubmit={handleSendMessage}>
                                        <input
                                            type="text"
                                            value={newMessage}
                                            onChange={(e) => {
                                                setNewMessage(e.target.value);
                                                handleTyping();
                                            }}
                                            placeholder="Type your message..."
                                        />
                                        <button type="submit">
                                            <FontAwesomeIcon icon={faPaperPlane} />
                                        </button>
                                    </form>
                                </>
                            ) : (
                                <div className="no-farmer-selected">
                                    Select a farmer to start chatting
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatWindow; 