import express from 'express';
import bcrypt from 'bcryptjs';
import { User } from "../databases/alldb.mjs";
import status from "../assets/status.mjs";

const router = express.Router();

// TODO: strengthen password
router.post("/register", async (req, res) => {
  if(!req.body.username || !req.body.password) {
    return res.status(401).send({message: status["reg-nodata"]});   // user mistake: incomplete information
  }

  const username = req.body.username;
  const password = req.body.password;
  
  try {
    const foundUser = await User.findOne({username: username});
    if(foundUser){
      return res.status(401).send({message: status["reg-exist"]});  // user mistake: username exists
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
    console.log(error);
    return res.status(502).send({message: status["reg-error"]});   // handle server error
  }
});

export default router;