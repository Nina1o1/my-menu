import jwt from "jsonwebtoken";
import "dotenv/config";

function verifyJWT (req, res, next) {
  const authHeader = req.headers['authorization'];
  console.log(req.headers);
  // auth headers
  next();
}

export default verifyJWT;