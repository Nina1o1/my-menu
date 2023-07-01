// sample data model
import mongoose, { mongo } from "mongoose";

const UserSchema = new mongoose.Schema({
  username: String,
  hash: String,
  filters: [FilterSchema], // array of references to filter
  recipes: [RecipeSchema] // array of references to recipe
});

const FilterSchema = new mongoose.Schema({
  username: String,
  category: String,
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
  categories: [FilterSchema], // array of referenced to index
  note: {type: String},
  image: String, // TODO: Mongoose image
  steps: [StepSchema], // embedded step schema
  ingredients: [IngredientSchema], // embedded ingredient schema
});

