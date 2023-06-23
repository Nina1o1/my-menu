import express from 'express';
import bcrypt from 'bcryptjs';
import { User } from "../databases/alldb.mjs";
import status from "../assets/status.mjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

const router = express.Router();

// ========== login post, via passport-local ==========
router.post("/login", async (req, res) => {
  if(!req.body.username || !req.body.password) {
    console.log(req.body);
    return res.status(401).send({message: status["login-nodata"]});   // incomplete information
  }
  
  const username = req.body.username;
  const password = req.body.password;
  
  try {
    const foundUser = await User.findOne({username: username});
    if(!foundUser) return res.status(401).send({message: status["login-noexist"]});  // handle user mistakes
    
    const compare = await bcrypt.compare(password, foundUser["hash"]);
    if(!compare) return res.status(401).send({message: status["login-noexist"]});    // handle user mistakes

    // create JWTs
    const accessToken = jwt.sign(
      {"username": username},
      process.env.ACCESS_TOKEN_SECRET,
      {expiresIn: "3000"}
    )
    const refreshToken = jwt.sign(
      {"username": username},
      process.env.REFRESH_TOKEN_SECRET,
      {expiresIn: "1d"}
    )
    // save refreshToken in current user
    foundUser["refreshToken"] = refreshToken;
    // save refreshToken in httpOnly cookie
    const cookieOptions = {
      httpOnly: true,
      origin: process.env.CLIENT_URL,
      sameSite: false,
      maxAge: 24 * 60 * 60 * 1000
    }
    res.cookie("jwt", refreshToken, cookieOptions)
    // send accessToken to client
    return res.send({accessToken, message: status["login-success"]});    // log user in
  
  } catch (error) {
    console.log(error);
    return res.status(502).send({message: status["login-error"]});      // handle server error
  }
});

// ========== logout post, via passport-local ==========
router.post("/logout", async (req, res) => {
  const cookies = req.cookies;

  // not logged in
  if (!cookies?.jwt) return res.sendStatus(204);

  const refreshToken = cookies.jwt;

  const foundUser = await User.findOne({refreshToken: refreshToken});
  const cookieOptions = {
    httpOnly: true,
    sameSite: false,
  }

  // no such user
  if(!foundUser) {
    res.clearCookie("jwt", cookieOptions);
    return res.sendStatus(204);
  }

  // delete refreshToken in database
  try {
    foundUser["refreshToken"] = "";
    await foundUser.save();
  } catch (error) {
    console.log(error);
    return res.sendStatus(502);
  }

  // clear cookie
  res.clearCookie('jwt', cookieOptions);
  res.sendStatus(204);
});

export default router;