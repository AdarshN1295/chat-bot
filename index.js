const io = require('socket.io')(8000, {
    cors: {
        origin: "http://127.0.0.1:5500", // Use the exact origin where your client is hosted
        methods: ["GET", "POST"]
    }
});

const users = {};

io.on('connection', (socket) => {
    socket.on('new-user-joined', (namee) => {
        users[socket.id] = namee;
        socket.broadcast.emit('user-joined', namee);
    });

    socket.on('send', (message) => {
        socket.broadcast.emit('receive', { message: message, namee: users[socket.id] });
    });

    socket.on('disconnect', (message) => {
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
});
