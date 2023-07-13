/* passport-local auth is not used in this project
import express from 'express';
import passport from 'passport';
import fs from "fs";
import LocalStrategy from "passport-local"
import * as local from "../utils/local-passport.mjs";

const router = express.Router();

// config passport-local strategy
const localStrtg = new LocalStrategy(local.localVerify);
passport.use("local", localStrtg);
passport.serializeUser(local.localSerializeUser);
passport.deserializeUser(local.localDeserializeUser);

// login post, via passport-local
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
        return res.status(502).send(info);  // handle server error
      }
      return res.send(info);                // log user in
    });
  })(req ,res, next)
});

// logout post, via passport-local
router.post("/logout", (req, res) => {
  let status;
  try {
    const data = fs.readFileSync("./src/assets/statusData.json", { encoding: "utf8"});
    status = JSON.parse(data);
  } catch (error) { 
    console.log(error);
    return res.sendStatus(502);
  }
  req.logout((error) => {
    if(error){
      return res.status(502).send({msg: status["logout-error"]})
    }
    return res.send({msg: status["logout-success"]})
  });
});

export default router;
*/