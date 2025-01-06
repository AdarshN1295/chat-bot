const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origin: "*", // Allow any origin for testing; restrict in production
        methods: ["GET", "POST"]
    }
});

const PORT = process.env.PORT || 8000;

// Serve static files from the root directory
app.use(express.static(__dirname + '/../'));

// Serve index.html at the root URL
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/../index.html');
});

const users = {};

io.on('connection', (socket) => {
    socket.on('new-user-joined', (namee) => {
        console.log('New User', namee);
        users[socket.id] = namee;
        socket.broadcast.emit('user-joined', namee);
    });

    socket.on('send', (message) => {
        socket.broadcast.emit('receive', { message: message, namee: users[socket.id] });
    });
});

http.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
