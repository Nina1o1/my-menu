import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {type: String, require: true},
  hash: {type: String},
  lists: [{
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'List'
  }]
});

export default UserSchema;