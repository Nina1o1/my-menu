import express, { urlencoded } from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { handleEditRecipe, handleUserLogin, handleUserRegister} from './socketFuncs.mjs'

const clientURL = "http://localhost:5173";

// connect to socket.io frontend
const app = express();
app.use(cors());
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

// urlencoded
app.use(urlencoded({extended: true}));

// handle io connection
function handleIOConnection (socket) {
  console.log(socket.id, "has connected");
  socket.on("send data", (data) => handleEditRecipe(data, socket));
  socket.on("login", (data) => handleUserLogin(data, socket));
  socket.on("register", (data) => handleUserRegister(data, socket));
}

io.on("connection", handleIOConnection);

server.listen(3000);