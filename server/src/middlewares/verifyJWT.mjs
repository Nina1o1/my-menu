import jwt from "jsonwebtoken";
import "dotenv/config";

function verifyJWT (req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.sendStatus(401);              // no token
  }
  const token = authHeader.split('=')[1];
  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (err, decoded) => {
      if (err) return res.sendStatus(401);  // invalid token
      req.user = decoded.username;
      next();
    }
  )
}

export default verifyJWT;