const express = require("express");
const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("API running"));

// Define routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/post", require("./routes/api/post"));
app.use("/api/comment", require("./routes/api/comment"));
app.use("/api/chatmessage", require("./routes/api/chatmessage"));
app.use("/api/chatroom", require("./routes/api/chatroom"));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App Listening on port ${PORT}`);
});
