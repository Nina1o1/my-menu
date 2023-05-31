import express from 'express';
import passport from 'passport';
import LocalStrategy from "passport-local"
import bcrypt from 'bcryptjs';
import sanitize from 'mongo-sanitize';
import { User, Recipe } from "../database/alldb.mjs";
import status from "../assets/status.mjs"

const router = express.Router();

// passport strategy
// TODO
const strategy = new LocalStrategy(async function verify(username, password, done) {
  try {
    const foundUser = await User.findOne({username: username});
    if(!foundUser) {
      return done(null, false);
    }
    const compare = bcrypt.compare(password, foundUser["hash"]);
    if(!compare){
      return done(null, false);
    }
    return done(null, foundUser);

  } catch (error) {
    return done(error);
  }
});
passport.use("local", strategy);

// serialize and deserialize user
passport.serializeUser((user, done) => {
  return done(null, {username: user.username});
});

passport.deserializeUser((user, done) => {
  return done(null, user);
});

// login post
// TODO: error here
router.post("/login", 
  passport.authenticate("local"),
  (req, res)=>{
    console.log(req);
});


// register post
// TODO: strengthen password
router.post("/register", async (req, res) => {
  const username = sanitize(req.body.username);
  const password = sanitize(req.body.password);
  
  // incomplete information
  if(username=== "" || password==="") {
    return res.status(401).send({regStatus: status["reg-nodata"]})
  }
  try {
    const foundUser = await User.findOne({username: username});
    // username exists
    if(foundUser){
      return res.status(401).send({regStatus: status["reg-exist"]});
    }
    // store new user in database
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    const newUser = new User({
      username: username,
      hash: hash
    });
    await newUser.save();
    res.send({regStatus: status["reg-success"]});

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