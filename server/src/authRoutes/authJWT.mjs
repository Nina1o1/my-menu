import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import "dotenv/config";
import { User, Category } from "../databases/alldb.mjs";
import readData from '../utils/readData.mjs';
import findRecipes from '../utils/findRecipes.mjs';

async function loginRouter (req, res) {
  let status;
  try {
    const statusPath = "./src/assets/statusData.json";
    status = await readData(statusPath);
  } catch (error) {
    console.log(error);
    return res.sendStatus(502);
  }
  
  const username = req.body.username;
  const password = req.body.password;
  
  try {
    const foundUser = await User.findOne({username: username});
    // user mistake: usename incorrect
    if(!foundUser) return res.status(401).send({msg: status["login-noexist"]});
    
    const compare = await bcrypt.compare(password, foundUser["hash"]);
    // user mistake: password incorrect
    if(!compare) return res.status(401).send({msg: status["login-noexist"]});

    // create JWTs
    const accessToken = jwt.sign(
      {"username": username,
       "userid": foundUser["_id"]},
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
    await foundUser.save();

    // save refreshToken in cookie
    const cookieOptions = {
      httpOnly: true,
      origin: process.env.CLIENT_URL,
      sameSite: false,
      maxAge: 24 * 60 * 60 * 1000
    }
    // const cookieData = JSON.stringify({refreshToken, userid: foundUser._id.toString()});
    // res.cookie("jwt", cookieData, cookieOptions);
    res.cookie("jwt", refreshToken, cookieOptions);

    // read user recipes
    const recipes = await findRecipes(foundUser);
    const categories = await Category.findOne({"author": foundUser._id});
    // user login, send accessToken and recipe data to client
    return res.send({accessToken, recipes, categories: categories?.["categories"], msg: status["login-success"]});
  } catch (error) {
    console.log(error);
    // server error
    return res.status(502).send({msg: status["login-error"]});
  }
}

async function logoutRouter (req,res) {
  // check refresh token
  const refreshToken = req?.cookies?.jwt;
  if(!refreshToken) return res.sendStatus(204);

  // target user
  const foundUser = await User.findOne({"refreshToken": refreshToken});
  if(!foundUser) {
    res.clearCookie("jwt", {httpOnly: true, sameSite: false});
    res.sendStatus(204);
  }
  
  // TODO : delete EXPIRED refresh token in cookie & user db (also access token)
  // delete refresh token in cookie & in user db
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