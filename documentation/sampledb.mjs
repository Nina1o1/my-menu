// sample data model
import mongoose, { mongo } from "mongoose";

// site requires authentication, so users need username and password
// user can have 0 or more list of recipes
const UserSchema = new mongoose.Schema({
  // username provided by authentication plugin
  // password hash provided by authentication plugin
  lists: [{type: mongoose.Schema.Types.ObjectId, ref: 'List'}]
})

// each recipe have a name, and according ingredients
const RecipesSchema = new mongoose.Schema({
  name: {type: String, required: true},
  ingredients: [{type: String, required: true}],
  description: {type: String},
  image: String// TODO: Mongoose imageg
})

