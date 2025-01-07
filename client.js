
const socket = io('http://localhost:8000');
// try{
//     const socket = io('http://localhost:8000');
// } catch (error){
//     console.log('test' + error)
// }


const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInput');
const messageContainer = document.getElementById('content-container');

const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.appendChild(messageElement)
}


form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, "right")
    socket.emit('send', message);
    messageInput.value = '';
})

const namee = prompt('enter your name');
socket.emit('new-user-joined', namee);

socket.on('user-joined', namee=>{
    append(`${namee} is joined the chat`, 'right')
})

socket.on('receive', data=>{
    append(`${data.namee}: ${data.message}`, 'left')
})

socket.on('left', namee=>{
    append(`${namee} left the chat`, 'left')
})



console.log(datee.getHours())
