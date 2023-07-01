// sample data model
import mongoose, { mongo } from "mongoose";

const UserSchema = new mongoose.Schema({
  username: String,
  hash: String,
  recipes: [RecipeSchema] // array of references to recipe
})

const StepSchema = new mongoose.Schema({
  description: {type: String},
  image: String // TODO: Mongoose image
});

const IngredientSchema = new mongoose.Schema({
  item: {type: String, require: true},
  amount: {type: String}
});

const RecipeSchema = new mongoose.Schema({
  author: UserSchema, // an user id
  name: {type: String, required: true},
  note: {type: String},
  image: String, // TODO: Mongoose image
  steps: [StepSchema], // embedded step schema
  ingredients: [IngredientSchema], // embedded ingredient schema
});

