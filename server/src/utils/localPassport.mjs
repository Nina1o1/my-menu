/* passport-local auth is not used in this project
import { User } from "../databases/alldb.mjs";
import bcrypt from 'bcryptjs';
import fs from "fs";

// ========== passport-local strategy ==========
async function localVerify(username, password, done){
  let status;
  try {
    const data = fs.readFileSync("./src/assets/statusData.json", { encoding: "utf8"});
    status = JSON.parse(data);
  } catch (error) { 
    console.log(error);
    return res.sendStatus(502);
  }

  try {
    const foundUser = await User.findOne({username: username});
    if(!foundUser) {
      return done(null, false, {message: status["login-noexist"]});
    }
    const compare = bcrypt.compare(password, foundUser["hash"]);
    if(!compare){
      return done(null, false, {message: status["login-noexist"]});
    }
    return done(null, foundUser, {message: status["login-success"]});

  } catch (error) {
    console.log(error);
    return done(error, false, {message: status["login-error"]});
  }
}

// ========== serialize user ==========
function localSerializeUser (user, done) {
  done(null, user.username); // stored in req.session.passport.user
}

// ========== deserialize user ==========
function localDeserializeUser (user, done) {
  try {
    done(null, user);       // stored in req.user
  } catch (error) {
    console.log(error);
    done(error);
  }
}

export {localVerify, localSerializeUser, localDeserializeUser};
*/