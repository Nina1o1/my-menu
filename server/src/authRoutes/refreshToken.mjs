import jwt from "jsonwebtoken";
import "dotenv/config";
import { User } from "../databases/alldb.mjs";

async function refreshTokenRouter (req, res) {
  // get refresh token
  const jwtCookie = req.cookies?.jwt;
  if (!jwtCookie) return res.sendStatus(401);
  const refreshToken = JSON.parse(jwtCookie)["refreshToken"];

  // find user
  try{
    const foundUser = await User.findOne({refreshToken});
    if (!foundUser) {
      res.clearCookie("jwt", { httpOnly: true, sameSite: false });
      return res.sendStatus(401);
    }

    console.log("hi bitch");
    // verify refresh token & send new access token
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err || foundUser.username !== decoded.username) return res.sendStatus(402);
        const accessToken = jwt.sign(
          {username: decoded.username},
          process.env.ACCESS_TOKEN_SECRET,
          {expiresIn: "15m"}
        )
        return res.send({accessToken});
      }
    )
  } catch (err) {
    console.log(err);
    return res.sendStatus(502);
  }
}

export default refreshTokenRouter;