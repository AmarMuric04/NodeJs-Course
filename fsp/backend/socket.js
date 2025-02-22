let io;

module.exports = {
  init: (httpServer) => {
    io = require("socket.io")(httpServer, {
      cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT"],
      },
    });
    return io;
  },
  getIO: () => {
    if (!io) throw new Error("Socket.io isn't initialized.");
    return io;
  },
};
