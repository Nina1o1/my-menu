import express from 'express';
import passport from 'passport';
import LocalStrategy from "passport-local"
import bcrypt from 'bcryptjs';
import { User } from "../database/alldb.mjs";
import * as local from "../passportAuth/localStrtg.mjs";

const router = express.Router();

// config passport-local strategy
const localStrtg = new LocalStrategy((username, password, done) => local.localVerify(username, password, done))
passport.use("local", localStrtg);
// passport-local serialize user
passport.serializeUser((user, done) => local.localSerializeUser(user, done));
// deserialize user
passport.deserializeUser((user, done) => local.localDeserializeUser(user, done));

// passport-local login post
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
  const username = req.body.username;
  const password = req.body.password;
  
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