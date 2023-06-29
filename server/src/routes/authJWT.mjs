import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import "dotenv/config";
import { User } from "../databases/alldb.mjs";
import status from "../assets/status.mjs";

async function loginRouter (req, res) {
  if(!req.body.username || !req.body.password) {
    // user mistake: incomplete information
    return res.status(401).send({message: status["login-nodata"]});
  }
  
  const username = req.body.username;
  const password = req.body.password;
  
  try {
    const foundUser = await User.findOne({username: username});
    // user mistake: usename incorrect
    if(!foundUser) return res.status(401).send({message: status["login-noexist"]});
    
    const compare = await bcrypt.compare(password, foundUser["hash"]);
    // user mistake: password incorrect
    if(!compare) return res.status(401).send({message: status["login-noexist"]});

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
    // save refreshToken in current user & cookie
    foundUser["refreshToken"] = refreshToken;
    await foundUser.save();
    const cookieOptions = {
      httpOnly: true,
      origin: process.env.CLIENT_URL,
      sameSite: false,
      maxAge: 24 * 60 * 60 * 1000
    }
    res.cookie("jwt", refreshToken, cookieOptions);
    // uselogin, send accessToken to client
    return res.send({accessToken, message: status["login-success"]});
  
  } catch (error) {
    console.log(error);
    // server error
    return res.status(502).send({message: status["login-error"]});
  }
}

async function logoutRouter (req,res) {
  // check refresh token
  const jwt = req?.cookies?.jwt;
  if(!jwt) return res.sendStatus(204);
  
  // target user
  const foundUser = await User.findOne({refreshToken: jwt});
  if(!foundUser) {
    res.clearCookie("jwt", {httpOnly: true, sameSite: false});
    res.sendStatus(204);
  }
  
  // delete refresh token
  res.clearCookie("jwt", {httpOnly: true, sameSite: false});
  try {
    foundUser["refreshToken"] = undefined;
    await foundUser.save();
  } catch(error) {
    console.log(error);
    res.sendStatus(502);
  }

  return res.sendStatus(204);

}

export {loginRouter, logoutRouter};