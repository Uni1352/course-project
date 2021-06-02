const socketServer = require('ws').Server;

function createSocketServer(server) {
  const wss = new socketServer({
    server: server
  });

  console.info('[Server] WebSocket server started...');

  wss.on('connection', (ws, req) => {
    console.info(`[Server] Connect Successfully!`);
  });
}

module.exports = createSocketServer;