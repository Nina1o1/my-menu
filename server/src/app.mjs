import url from 'url';
import path from 'path';
import express, { urlencoded } from 'express';
import passport from 'passport';
import cors from 'cors';
import session from "express-session";
import authRouter from "./routes/auth.mjs";
import indexRouter from "./routes/index.mjs"
const app = express();

const clientURL = "http://localhost:5173";

// cors
app.use(cors());
// form format
app.use(express.json());
app.use(urlencoded({extended: false}));
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
app.use(passport.authenticate('session'));
// serve routes
app.use("/", authRouter);
app.use("/", indexRouter);

app.listen(3000, () => {
  console.log("connecting to server...")
});