let users = [];
let admins = [];


const SocketServer = (socket) => {
  //#region //!Connection
  socket.on("joinUser", (id) => {
    users.push({ id, socketId: socket.id });
  });

  socket.on("joinAdmin", (id) => {
    admins.push({ id, socketId: socket.id });
    const admin = admins.find((admin) => admin.id === id);
    let totalActiveUsers = users.length;

    socket.to(`${admin.socketId}`).emit("activeUsers", totalActiveUsers);
  });

  socket.on("disconnect", () => {
    users = users.filter((user) => user.socketId !== socket.id);
    admins = admins.filter((user) => user.socketId !== socket.id);
  });

  //#endregion

  socket.on("getActiveUsers", (id) => {
    const admin = admins.find((user) => user.id === id);
    const totalActiveUsers = users.length;

    socket
      .to(`${admin.socketId}`)
      .emit("getActiveUsersToClient", totalActiveUsers);
  });

  //#region //!Messages

  socket.on("addMessage", (msg) => {
    const user = users.find(user => user.id === msg.recipient);
    user && socket.to(`${user.socketId}`).emit("addMessageToClient", msg);
  });

  //#endregion
}

module.exports = SocketServer;
