import express from 'express';
import passport from 'passport';
import LocalStrategy from "passport-local"
import bcrypt from 'bcryptjs';
import { User } from "../database/alldb.mjs";
import status from "../assets/status.mjs";
import * as local from "../passportAuth/local-strategy.mjs";

const router = express.Router();

// config passport-local strategy
const localStrtg = new LocalStrategy(local.localVerify)
passport.use("local", localStrtg);
passport.serializeUser(local.localSerializeUser);
passport.deserializeUser(local.localDeserializeUser);

// login post
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (error, user, info) => {
    if (error) {
      return res.status(502).send(info);    // handle server error
    }
    else if (!user) {
      return res.status(401).send(info);    // handle user mistakes
    }
    req.login(user, (error) => {
      if (error) {
        return res.status(502).send(info);  // handle user mistakes
      }
      return res.send(info);                // log user in
    });
  })(req ,res, next)
});

// register post
// TODO: strengthen password
router.post("/register", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  
  if(username=== "" || password==="") {
    return res.status(401).send({message: status["reg-nodata"]});   // user mistake: incomplete information
  }
  try {
    const foundUser = await User.findOne({username: username});
    if(foundUser){
      return res.status(401).send({message: status["reg-exist"]});  //user mistake: username exists
    }
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    const newUser = new User({
      username: username,
      hash: hash
    });
    await newUser.save();                                          // store new user in database
    return res.send({message: status["reg-success"]});             // register user

  } catch (error) {
    return res.status(502).send({message: status["reg-error"]});   // handle server error
  }
});

// logout post
router.post("/logout", (req, res) => {
  req.logout((error) => {
    if(error){
      return res.status(502).send({message: status["logout-error"]})
    }
    return res.send({message: status["logout-success"]})
  });
});

export default router;