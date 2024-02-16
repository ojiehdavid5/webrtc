const express=require('express');
const http=require('http');
const  app=express();
const server=http.createServer(app);
const socket=require('socket.io');

const io=socket(server);
io.on("connnection",(socket) =>{
    socket.emit('me',socket.id)
} )



socket.on('disconect',()=>{
    socket.broadcast.emit('callEnded'); 
})


socket.on('callUser',(data)=>{

    io.to(data.userToCall).emit('callUser',{signal:data.signalData,from:data.from, name:data.name})
})

socket.on('answerCall',)


server.listen(5000,()=> console.log("serveris running on a port 5000"))