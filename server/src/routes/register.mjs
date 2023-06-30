import bcrypt from 'bcryptjs';
import { User } from "../databases/alldb.mjs";
import readData from '../utils/readData.mjs';

async function registerRouter (req, res) {
  let status;
  try {
    const statusPath = "./src/assets/statusData.json";
    status = await readData(statusPath);
  } catch (error) {
    console.log(error);
    return res.sendStatus(502);
  }

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