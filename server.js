const httpServer = require('./src/server/servers/http');
const wsServer = require('./src/server/servers/websocket');

let server = httpServer.listen(8080, () => {
  wsServer(server);
  console.info('[Server] server started!');
});