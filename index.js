// Server Model: Contiene todo el servidor de express + socket.io configurado
import Server from './models/server.js'
import "dotenv/config.js";

const server = new Server();
server.execute();



