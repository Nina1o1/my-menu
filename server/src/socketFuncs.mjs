import bcrypt from 'bcryptjs';
import sanitize from 'mongo-sanitize';
import * as fs from "fs";
import url from 'url'; 
import path from 'path';
import passport from "passport";
import { User, Recipe } from "./database/alldb.mjs";

// read status options
let status = {};

// input status json file
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
try {
  const data = fs.readFileSync(path.join(__dirname, "assets/status.json"),{encoding: 'utf8'});
  status = JSON.parse(data);
} catch (error) {
  console.log(error);
}

// when user edit a recipe
function handleEditRecipe(data, socket){
  console.log(data)
}

// when user login
function handleUserLogin(data, socket){
  // TODO: success, failure status
  console.log(data)
  const username = sanitize(data.username);
  const password = sanitize(data.password);

  socket.emit("login status", data);
}

// when a new user registers
async function handleUserRegister(data, socket){
  const username = sanitize(data.username);
  const password = sanitize(data.password);
  let regStatus = "";
  
  try {
    const foundUser = await User.findOne({username: username});
    // username exists
    if(foundUser !== null){
      regStatus = status["reg-exist"]
    }
    // create a new user
    else{
      // salt&hash, and store new user in database
      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(password, salt);
      const newUser = new User({
        username: username,
        hash: hash
      });
      await newUser.save();
      regStatus = status["reg-success"]
    }
  } catch (error) {
    // if error, display error message
    console.log(error);
    regStatus = status["reg-error"];
  }
  socket.emit("register status", regStatus)
}

export {
  handleEditRecipe, 
  handleUserLogin, 
  handleUserRegister
}