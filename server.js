const express  = require('express')
const app      = express()
const port     = 3000
const server   = app.listen(port, () => {console.log(`Server running at http://localhost:${port}`)})
const io 	   = require('socket.io').listen(server)

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
  })
  
  app.use(express.static('.'))
  io.on('connection', function (socket) {
    // Listen for a "newuser" message
    socket.on('username', function(username) {
      socket.username = username;
        // Transmit a message to everyone except the sender
      socket.broadcast.emit('newuser', username)
      // The same message, sent to all users - try it!
      //io.emit('newuser', data)
      })
      // Listen for "chatmsg"
      //   io.emit to all user
      socket.on('chatmsg', (data) => {
          io.emit('chatmsg',{msg : data.msg, username: socket.username , time : data.formattedTime})
      })
      //Someone is typing

      socket.on('typing', (data) => { 
        socket.broadcast.emit('notifyTyping', { user: socket.username, message: data.message })
      })

      //when soemone stops typing

      socket.on('stopTyping', () => { socket.broadcast.emit("notifyStopTyping"); });
    
  })  

