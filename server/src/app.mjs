// modules
import url from 'url';
import path from 'path';
import express, { urlencoded } from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser";
import "dotenv/config";
// authentication routes
import { loginRouter, logoutRouter } from "./authRoutes/authJWT.mjs";
import registerRouter from "./authRoutes/register.mjs";
import refreshTokenRouter from "./authRoutes/refreshToken.mjs";
// protected routes
import editRecipeRouter from './routes/editRecipe.mjs';
// middlewares
import sanitizeInput from "./middlewares/sanitizeInput.mjs";
import { verifyJWT, verifyAuthRouter } from './middlewares/verifyJWT.mjs';

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
  methods: ['GET', 'PUT', 'POST', 'DELETE']
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


// sanitize input
app.use("/", sanitizeInput);

app.post("/register", registerRouter);
app.post("/login", loginRouter);
app.post("/logout", logoutRouter);

// refresh access token
app.get("/api/refresh", refreshTokenRouter);

// verify access token and serve protected routes
app.use("/", verifyJWT);
app.get("/api/verifyAuth", verifyAuthRouter);

// protected routes
app.post("/editRecipe", editRecipeRouter);

app.listen(3000, () => {
  console.log("connecting to server...")
});