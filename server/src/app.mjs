// modules
import url from 'url';
import path from 'path';
import express, { urlencoded } from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser";
import "dotenv/config"
// routes
import authJWTRouter from "./routes/authJWT.mjs";
import registerRouter from "./routes/register.mjs";
import refreshTokenRouter from "./routes/refreshToken.mjs"
import indexRouter from "./routes/index.mjs";
// middlewares
import sanitizeInput from "./middlewares/sanitizeInput.mjs";
import verifyJWT from './middlewares/verifyJWT.mjs';
/* passport-local auth is not used in this project
import passport from 'passport';
import session from "express-session"; 
*/

const app = express();

// serve static files
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, 'public')));

// cors
const corsOptions = {
  credentials: true,
  origin: process.env.CLIENT_URL,
  allowedHeaders: ['Content-Type'],
  methods: ['GET', 'PUT', 'POST', 'DELETE'],
}
app.use(cors(corsOptions));

// form format
app.use(express.json());
app.use(urlencoded({extended: false}));

app.use(cookieParser());

/* passport-local auth is not used in this project
// session & passport set up
const sessionOptions = {
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false },
}
app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());
*/

app.use((req,res,next) => {console.log(req);next()});
// sanitize input
app.use("/", sanitizeInput);

// handle user login routes
app.use("/", registerRouter);
app.use("/", authJWTRouter);

// refresh access token
app.use("/", refreshTokenRouter);

// verify access token
app.use("/", verifyJWT);

app.use((req,res,next) => {console.log(req);next()});

app.use("/", indexRouter);

app.get("/test", (req,res) => {
  console.log(req)
  res.send({message: "move on dude"});
});

app.listen(3000, () => {
  console.log("connecting to server...")
});