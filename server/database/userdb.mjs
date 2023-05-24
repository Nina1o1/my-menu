import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  // username provided by authentication plugin
  // password hash provided by authentication plugin
  lists: [{
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'List'
  }]
});

export default UserSchema;