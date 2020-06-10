'use strict'

const socket = io()
// get user name
var username = prompt('Please tell me your name');
socket.emit('username', username);
// Send a message to say that I've connected
// Event listener, waiting for an incoming "newuser"
socket.on('newuser', (username) => console.log(`${username} has connected!`))

// Listen for the 'submit' of a form
// 	 event.preventDefault()  (prevent the form from leaving the page)
//   Emit a message using "chatmsg"
// Listen for "chatmsg"
//   add a <li> with the chat msg to the <ol>

const $msgForm = document.getElementById('sendMsg')
const $msgList = document.getElementById('messages')


$msgForm.addEventListener('submit', (event) => {
	event.preventDefault()
	socket.emit('chatmsg', {msg: event.currentTarget.txt.value})
	event.currentTarget.txt.value = ''
})

const time = new Date();
const formattedTime = time.toLocaleString("en-US", { hour: "numeric", minute: "numeric" });
console.log(formattedTime);

socket.on('chatmsg', (data) => {
	const newMsg = document.createElement('li')
	$msgList.appendChild(newMsg)
	newMsg.textContent = (  data.username  +  " : "  +  data.msg + formattedTime )
})

// message.bind('keypress', () => {
// 	socket.emit('typing')
// })

// socket.on('typing', (data) => {
// 	newMsg.textContent = ( + data.username  +  "is typing a message..."  )
// })