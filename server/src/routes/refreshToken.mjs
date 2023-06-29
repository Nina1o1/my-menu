import jwt from "jsonwebtoken";
import "dotenv/config";
import { User } from "../databases/alldb.mjs";

async function refreshTokenRouter (req, res) {
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
}

export default refreshTokenRouter;