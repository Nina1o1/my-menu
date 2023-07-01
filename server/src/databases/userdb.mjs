import mongoose from "mongoose";
import { Schema } from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true
  },

  hash: {
    type: String, 
    require: true
  },

  refreshToken: {
    type: String
  },
  
  recipes: [{
    type: Schema.Types.ObjectId,
    ref: "Recipe"
  }]
});

export default UserSchema;