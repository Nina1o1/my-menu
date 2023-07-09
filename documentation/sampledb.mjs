// sample data model
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: String,
  hash: String,
  categories: CategorySchema, // a reference to filter
  recipes: [RecipeSchema] // array of references to recipe
});

const CategorySchema = new mongoose.Schema({
  username: String,
  categories: [String],
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
  categories: [CategorySchema], // array of referenced to index
  note: {type: String},
  image: String, // TODO: Mongoose image
  steps: [StepSchema], // embedded step schema
  ingredients: [IngredientSchema], // embedded ingredient schema
});s