import express from 'express';
import passport from 'passport';
import LocalStrategy from "passport-local"
import bcrypt from 'bcryptjs';
import sanitize from 'mongo-sanitize';
import { User, Recipe } from "../database/alldb.mjs";
import status from "../assets/status.mjs"

const router = express.Router();

// passport strategy
const strategy = new LocalStrategy(function verify(username, password, done) {
  // TODO
});
passport.use(strategy);

// serialize and deserialize user
passport.serializeUser((user, done) => {
  const storeUser = {
    username: user.username
  }
  return done(null, storeUser);
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
router.post("/register", async (req, res) => {
  const username = sanitize(req.body.username);
  const password = sanitize(req.body.password);
  
  try {
    const foundUser = await User.findOne({username: username});
    // username exists
    if(foundUser !== null){
      res.status(401).send({regStatus: status["reg-exist"]});
    }

    // store new user in database
    else{
      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(password, salt);
      const newUser = new User({
        username: username,
        hash: hash
      });
      await newUser.save();
      res.send({regStatus: status["reg-success"]});
    }

  } catch (error) {
    // if error, display error message
    console.log(error);
    res.status(502).send({regStatus: status["reg-error"]});
  }
});

// log out post
router.post("/logout", (req, res) => {

});

export default router;