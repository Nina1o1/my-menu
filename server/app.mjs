import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import {User, Recipe} from "./database/alldb.mjs"

const clientURL = "http://localhost:5173"

// connect to socket.io frontend
const app = express();
app.use(cors())
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: clientURL,
    methods: ["GET","POST"]
  }
});

// serve static files
import url from 'url';
import path from 'path';
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, 'public')));

// handle io connection
function handleIOConnection (socket) {
  console.log(socket.id, "has connected");
  socket.on("send data", (data) => {
    console.log(data)
  })
}

io.on("connection", handleIOConnection);

server.listen(3000);