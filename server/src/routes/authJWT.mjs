// JWT authentication method

import express from 'express';
import bcrypt from 'bcryptjs';
import { User } from "../databases/alldb.mjs";
import status from "../assets/status.mjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

const router = express.Router();

// login post, via passport-local
router.post("/login", async (req, res) => {
  if(!req.body.username || !req.body.password) {
    return res.status(401).send({message: status["login-nodata"]});   // incomplete information
  }
  
  const username = req.body.username;
  const password = req.body.password;
  
  try {
    const foundUser = await User.findOne({username: username});
    if(!foundUser) {
      return res.status(401).send({message: status["login-noexist"]});  // handle user mistakes
    }
    
    const compare = bcrypt.compare(password, foundUser["hash"]);
    if(!compare){
      return res.status(401).send({message: status["login-noexist"]});  // handle user mistakes
    }

    // create JWTs
    const accessToken = jwt.sign(
      {"username": username},
      process.env.ACCESS_TOKEN_SECRET,
      {expiresIn: "15m"}
    )
    const refreshToken = jwt.sign(
      {"username": username},
      process.env.REFRESH_TOKEN_SECRET,
      {expiresIn: "1d"}
    )
    // save refreshToken in current user
    foundUser["refreshToken"] = refreshToken;
    // save refreshToken in httpOnly cookie
    const options = {
      httpOnly: true,
      origin: process.env.CLIENT_URL,
      sameSite: false,
      maxAge: 24 * 60 * 60 * 1000
    }
    res.cookie("jwt", refreshToken, options)
    // send accessToken to client
    return res.send({accessToken, message: status["login-success"]});    // log user in
  
  } catch (error) {
    console.log(error);
    return res.status(502).send({message: status["login-error"]});      // handle server error
  }
});

// logout post, via passport-local
router.post("/logout", (req, res) => {

  // delete refreshToken in 
  
  // clear cookie
});

export default router;