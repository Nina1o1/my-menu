import { User } from "../database/alldb.mjs";
import bcrypt from 'bcryptjs';
import status from "../assets/status.mjs";

// passport-local strategy
async function localVerify(username, password, done){
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
    return done(error, false, {message: status["login-error"]});
  }
}

// serialize user
function localSerializeUser (user, done) {
  done(null, user.username); // user stored in req.session.passport.user
}
// passport.serializeUser((user, done) => {
//   done(null, user.username); // user stored in req.session.passport.user
// });

function localDeserializeUser (user, done) {
  try {
    done(null, user); // user attached in req.user
  } catch (error) {
    done(error);
  }
}
// deserialize user
// passport.deserializeUser((user, done) => {
//   console.log(user);
//   try {
//     done(null, user); // user attached in req.user
//   } catch (error) {
//     done(error);
//   }
// });

export {localVerify, localSerializeUser, localDeserializeUser};