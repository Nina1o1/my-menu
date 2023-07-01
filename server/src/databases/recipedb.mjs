import mongoose, { Schema } from "mongoose";
import IngredientSchema from "./ingredientdb.mjs";
import StepSchema from "./stepdb.mjs";

const RecipeSchema = new mongoose.Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    require: true
  },

  name: {
    type: String,
    required: true
  },

  categories: [{
    type: Schema.Types.ObjectId,
    ref: "Filter"
  }],

  note: {
    type: String
  },

  image: {
    type: String // TODO: Mongoose image
    // required: true
  },

  steps: [{
    type: StepSchema,
    required: true
  }],

  ingredients: [{
    type: IngredientSchema,
    required: true
  }],

});

export default RecipeSchema;