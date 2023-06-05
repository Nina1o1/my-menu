import url from 'url';
import path from 'path';
import express, { urlencoded } from 'express';
import passport from 'passport';
import cors from 'cors';
import cookieParser from "cookie-parser";
import session from "express-session";
import authRouter from "./routes/auth.mjs";
import indexRouter from "./routes/index.mjs"
const app = express();

const clientURL = "http://localhost:5173";

// serve static files
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, 'public')));
// cors
app.use(cors({
  credentials: true,
  origin: clientURL,
  allowedHeaders: ['Content-Type'],
  methods: ['GET', 'PUT', 'POST', 'DELETE'],
}));
// form format
app.use(express.json());
app.use(urlencoded({extended: true}));
// session set up
const options = {
	secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false },
}
app.use(cookieParser());
app.use(session(options));
app.use(passport.initialize());
app.use(passport.session());
// serve routes
app.use("/",(req,res,next)=>{
  console.log("\n======middleware\n", req.session);
  next()
});
// handle routes
app.use("/", authRouter);
app.use("/", indexRouter);
app.listen(3000, () => {
  console.log("connecting to server...")
});