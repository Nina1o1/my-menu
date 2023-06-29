import bcrypt from 'bcryptjs';
import { User } from "../databases/alldb.mjs";
import status from "../assets/status.mjs";

async function registerRouter (req, res) {
  // user mistake: incomplete information
  if(!req.body.username || !req.body.password) return res.status(401).send({message: status["register-nodata"]});

  const username = req.body.username;
  const password = req.body.password;
  
  try {
    const foundUser = await User.findOne({username: username});
    // user mistake: username already exists
    if(foundUser) return res.status(401).send({message: status["register-exist"]});
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    // register new user
    const newUser = new User({
      username: username,
      hash: hash
    });
    await newUser.save();
    return res.send({message: status["register-success"]}); 

  } catch (error) {
    // server error
    console.log(error);
    return res.status(502).send({message: status["register-error"]});
  }
}

export default registerRouter;