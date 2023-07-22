import mongoose, { Schema } from "mongoose";
import IngredientSchema from "./ingredientdb.mjs";
import StepSchema from "./stepdb.mjs";

const RecipeSchema = new mongoose.Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    require: true
  },

  dishname: { // TODO: unique for each user
    type: String,
    required: true
  },

  serveSize: {
    type: String
  },

  categories: [{
    type: String,
    ref: "Category"
  }],

  note: {
    type: String
  },

  image: {
    type: String // TODO: Mongoose image
    // required: true
  },

  imageNote: {
    type: String
  },

  ingredients: [{
    type: IngredientSchema,
    required: true
  }],
  
  steps: [{ // TODO: in order
    type: StepSchema,
    required: true
  }],
});

export default RecipeSchema;