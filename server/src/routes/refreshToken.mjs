import express from 'express';
import jwt from "jsonwebtoken";
import "dotenv/config";
import { User } from "../databases/alldb.mjs";

const router = express.Router();

router.get("/api/refresh", async (req, res) => {
  // get refresh cookie
  const refreshJWT = req.cookies?.jwt;
  if (!refreshJWT) return res.sendStatus(401);

  // find user
  try{
    const foundUser = await User.findOne({refreshToken: refreshJWT});
    if (!foundUser) {
      res.clearCookie("jwt", { httpOnly: true, sameSite: false });
      return res.sendStatus(401);
    }
    // verify refresh cookie & create new access token
    jwt.verify(
      refreshJWT,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err || foundUser.username !== decoded.username) return res.sendStatus(402);
        const accessToken = jwt.sign(
          {username: decoded.username},
          process.env.ACCESS_TOKEN_SECRET,
          {expiresIn: "3s"}
        )
        res.send({accessToken});
      }
    )
  } catch (err) {
    console.log(err);
    return res.sendStatus(502);
  }

/*
  const cookies = req.cookies;
  // no refresh cookie
  // TODO: expired refresh cookie
  if(!cookies?.jwt) return res.sendStatus(401);

  const refreshToken = cookies.jwt;
  const foundUser = await User.findOne({username: refreshToken});
  // user not in database
  if(!foundUser) return res.sendStatus(401);
  // evaluate jwt
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err, encoded) => {
      if(err || foundUser.username !== decoded.username) return res.sendStatus(401);
      const accessToken = jwt.sign(
        {"username": foundUser.username},
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '3s' }
      );
      res.send({accessToken});
    }
  )
*/
});

export default router;