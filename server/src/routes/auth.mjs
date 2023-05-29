import express from 'express';
import passport from 'passport';
import LocalStrategy from "passport-local"
import bcrypt from 'bcryptjs';
import sanitize from 'mongo-sanitize';
import { User, Recipe } from "../database/alldb.mjs";

const router = express.Router();

// passport strategy
const strategy = new LocalStrategy(function verify(username, password, done) {
  // TODO
});
passport.use(strategy);

// serialize and deserialize user
passport.serializeUser((user, done) => {
  return done(null, user);
});

passport.deserializeUser((user, done) => {
  return done(null, user);
});

// login post
router.post("/login", 
passport.authenticate('local', { 
  failureRedirect: '/login', 
  failureMessage: true 
}),
(req, res) => {
  console.log(req.body);
});

// register post
router.post("/register", (req, res) => {
  console.lod(req.body);
});

// log out post
router.post("/logout", (req, res) => {

});

export default router;