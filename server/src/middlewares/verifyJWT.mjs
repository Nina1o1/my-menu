import jwt from "jsonwebtoken";
import "dotenv/config";

// verifies access token
function verifyJWT (req, res, next) {
  // check "authorization" header for refresh token
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.sendStatus(401);
  }
  const token = authHeader.split(" ")[1];
  
  jwt.verify(
    // verify access token
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (err, decoded) => {
      // expired access token
      if (err) return res.sendStatus(403);
      req.user = decoded.user;
      next();
    }
  )
}

function verifyAuthRouter (req, res) {
  res.sendStatus(200);
}

export {verifyJWT, verifyAuthRouter};