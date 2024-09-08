const express = require('express')
const app = express()
const http = require('http')
const { Server } = require('socket.io')
const cors = require('cors')

app.use(cors())
app.use(express.json())
const server = http.createServer(app)

app.post('/settings_updated', (req, res) => {
    const { settings } = req.body
    io.emit('new_settings', settings);  // Emit the message to all connected clients
    res.status(200).send('Settings updated sent');
});

app.post('/vote_count_updated', (req, res) => {
    const { vote_count } = req.body
    io.emit('vote_count_updated', vote_count);  // Emit the message to all connected clients
    res.status(200).send('Vote count updated sent');
});

const io = new Server(server, {
    cors:{
        origin: "https://kvsp1spr.teknologikomputeransp1.com",
        methods: ["GET","POST"]
    }
})

io.on("connection", socket => {
    socket.on("say_hello", () => {
        console.log("Hello from Laravel Socket.io")
    })
})

server.listen(3000, () => {
    console.log("Server is running")
})