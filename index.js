const express = require('express');
const app = express();
const path = require('path');
const SocketIO = require('socket.io');

//settings
app.set('port', process.env.PORT || 3000);


//static files
app.use(express.static(path.join(__dirname, 'public')));


//start the server
const server = app.listen(app.get('port'), () =>{
    console.log('server on port', app.get('port'));
});


//websockets
const io = SocketIO(server);
io.on('connection', (socket) => {
    console.log('new connection', socket.id);
    socket.on('chat:message', (data) =>{
        //console.log(data);
        io.sockets.emit('chat:message', data); //recibir datos y reenviar a todos los browsers
    });

    socket.on('chat:typing', (data) => {
        //console.log(username);
        socket.broadcast.emit('chat:typing', data);
    });
});





