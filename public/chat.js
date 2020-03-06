const socket = io();

//DOM Elements
let message = document.getElementById('message');
let username = document.getElementById('username');
let btn = document.getElementById('send');
let output = document.getElementById('output');
let actions = document.getElementById('actions');

btn.addEventListener('click', () =>{
    socket.emit('chat:message', {  //emisor
        message: message.value,
        username: username.value

    });
});

message.addEventListener('keypress', () => {
    socket.emit('chat:typing', username.value);
});

//receptor-escucha
socket.on('chat:message', (data) =>{
    //console.log(data);
    actions.innerHTML = '';
    output.innerHTML +=  `<p>
    <strong>${data.username}</strong>: ${data.message}
    </p>`
});     

socket.on('chat:typing', (data) => {
actions.innerHTML = `<p><em>${data} is typing...</em></p>`
});