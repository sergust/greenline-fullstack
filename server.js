const express = require("express");
const connectDB = require("./config/db");
const cors = require('cors');

const app = express();
var httpServer = require('http').createServer(app);
var io = require('socket.io')(httpServer, {
  cors: {
    //react application url
    origin: "http://localhost:3000"
  }
});


connectDB();

app.use(express.json({ extended: false }));
app.use(cors())

app.get("/", (req, res) => res.send("API running"));

// Define routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/post", require("./routes/api/post"));
app.use("/api/comment", require("./routes/api/comment"));
app.use("/api/chatmessage", require("./routes/api/chatmessage"));
app.use("/api/chatroom", require("./routes/api/chatroom"));
app.use("/api/business", require("./routes/api/business"));

//socket server
io.on('connection', (socket) => {
  console.log('Hello, Amar! Somebody connected to your server');

  //whenever user gets disconnected
  socket.on('disconnect', () => {
    console.log('Hello, Amar! Somebody has been disconnected form your server');
  })
})


const PORT = 5000;

httpServer.listen(PORT, () => {
  console.log(`App Listening on port ${PORT}`);
});
