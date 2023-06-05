import express from 'express';
import passport from 'passport';
import LocalStrategy from "passport-local"
import bcrypt from 'bcryptjs';
import sanitize from 'mongo-sanitize';
import { User, Recipe } from "../database/alldb.mjs";
import status from "../assets/status.mjs"

const router = express.Router();

// passport strategy
const strategy = new LocalStrategy(async function verify(username, password, done) {
  username = sanitize(username);
  password = sanitize(password);
  try {
    const foundUser = await User.findOne({username: username});
    if(!foundUser) {
      return done(null, false, {message: status["login-noexist"]});
    }
    const compare = bcrypt.compare(password, foundUser["hash"]);
    if(!compare){
      return done(null, false, {message: status["login-noexist"]});
    }
    return done(null, foundUser, {message: status["login-success"]});

  } catch (error) {
    return done(error, false, {message: status["login-error"]});
  }
});
passport.use("local", strategy);

// serialize and deserialize user
passport.serializeUser((user, done) => {
  // user stored in req.session.passport.user
  done(null, user.username);
});

passport.deserializeUser((user, done) => {
  try {
    // user attached in req.user
    done(null, user);
  } catch (error) {
    done(error);
  }
});

// login post
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (error, user, info) => {
    if (error) {
      return res.status(502).send(info);
    }
    else if (!user) {
      return res.status(401).send(info);
    }
    req.login(user, (error) => {
      if (error) {
        return res.status(502).send(info);
      }
      return res.send(info)
    });
  })(req ,res, next)
});


// register post
// TODO: strengthen password
router.post("/register", async (req, res) => {
  const username = sanitize(req.body.username);
  const password = sanitize(req.body.password);
  
  // incomplete information
  if(username=== "" || password==="") {
    return res.status(401).send({message: status["reg-nodata"]})
  }
  try {
    const foundUser = await User.findOne({username: username});
    // username exists
    if(foundUser){
      return res.status(401).send({message: status["reg-exist"]});
    }
    // store new user in database
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    const newUser = new User({
      username: username,
      hash: hash
    });
    await newUser.save();
    res.send({message: status["reg-success"]});

  } catch (error) {
    // if error, display error message
    res.status(502).send({message: status["reg-error"]});
  }
});

// log out post
router.post("/logout", (req, res, next) => {
  req.logout((error) => {
    if(error){
      return res.status(502).send({message: status["logout-error"]})
    }
    res.send({message: status["logout-success"]})
  });
});

export default router;