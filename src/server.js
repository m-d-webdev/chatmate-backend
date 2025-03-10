import app from "./app.js"
import Http from 'http'
import { log } from "console"
import ConnectToDb from './config/db.js'
import { Server } from "socket.io"
import startSocket from "./config/socket.js"
// --------------
ConnectToDb();
const server = new Http.createServer(app);
const io = new Server(server, {
    cors: "*"
});
startSocket(io)
server.listen(process.env.PORT, () => {
    console.log("--------------------------------------------");
    console.log("✅ ----- Server running on port", process.env.PORT);
    console.log("--------------------------------------------");
    log()
})

