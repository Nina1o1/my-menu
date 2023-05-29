import url from 'url';
import path from 'path';
import express, { urlencoded } from 'express';
// import { createServer } from 'http';
// import { Server } from 'socket.io';
import passport from 'passport';
import LocalStrategy from "passport-local"
import cors from 'cors';
import session from "express-session";
import cookieParser from "cookie-parser";
import { handleEditRecipe, handleUserLogin, handleUserRegister} from './socketFuncs.mjs'
import authRouter from "./routes/auth.mjs";
import indexRouter from "./routes/index.mjs"
const app = express();

const clientURL = "http://localhost:5173";

// cors
app.use(cors());
// form format
app.use(urlencoded({extended: false}));
app.use(express.json());
// serve static files
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, 'public')));
// session set up
const options = {
	secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: true }
}
app.use(passport.initialize());
app.use(session(options));
app.use(passport.session());
app.use(cookieParser("keyboard cat"))
// serve routes
app.use("/", authRouter);
app.use("/", indexRouter);

// // ...connect to socket.io frontend
// const server = createServer(app);
// const io = new Server(server, { 
//   cors: {
//     origin: clientURL,
//     methods: ["GET","POST"]
//   }
// });

// handle io connection
// as well as also post and get requests
// function handleIOConnection (socket) {
//   console.log(socket.id, "has connected");

//   // user register
//   app.post("/register", (req,res) => {
//     handleUserRegister(req.body, socket)
//   });

//   // user login
//   // app.post("/login", (req,res) => {
//   //   handleUserLogin(req.body, socket);
//   // })

//   // query recipes
//   socket.on("send data", (data) => handleEditRecipe(data, socket));
// }

// io.on("connection", handleIOConnection);

app.listen(3000, () => {
  console.log("connected to server...")
});