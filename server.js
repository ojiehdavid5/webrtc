const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const socket = require('socket.io');

const io = socket(server);
io.on('connection', (socket) => { // Corrected event name 'connection'
    socket.emit('me', socket.id);
});

socket.on('disconnect', () => {
    socket.broadcast.emit('callEnded');
});

socket.on('callUser', (data) => {
    io.on(data.userToCall).emit('callUser', { signal: data.signalData, from: data.from, name: data.name });
});

socket.on('answerCall', () => {
    // Handle the 'answerCall' event
});

server.listen(5000, () => console.log("Server is running on port 5000"));