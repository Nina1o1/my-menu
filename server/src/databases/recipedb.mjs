import mongoose from "mongoose";
import IngredientSchema from "./ingredientdb.mjs";
import StepSchema from "./stepdb.mjs";
import { Schema } from "mongoose";

const RecipeSchema = new mongoose.Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },

  name: {
    type: String,
    required: true
  },
  
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