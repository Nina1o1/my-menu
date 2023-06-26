import jwt from "jsonwebtoken";
import "dotenv/config";

// verifies access token
function verifyJWT (req, res, next) {
  // check "authorization" header for refresh token
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.sendStatus(401);
  const token = authHeader.split(" ")[1];
  
  // verify access token
  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (err, decoded) => {
      if (err) return res.sendStatus(403); // invalid user
      req.user = decoded.user;
      next();
    }
  )
}

export default verifyJWT;