import mongoose, { Schema } from "mongoose";
import IngredientSchema from "./ingredientdb.mjs";
import StepSchema from "./stepdb.mjs";

const RecipeSchema = new mongoose.Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    require: true
  },

  name: { // TODO: unique for each user
    type: String,
    required: true
  },

  serveSize: {
    type: String
  },

  categories: [{
    type: Schema.Types.ObjectId,
    ref: "Category"
  }],

  note: {
    type: String
  },

  image: {
    type: String // TODO: Mongoose image
    // required: true
  },

  steps: [{ // TODO: in order
    type: StepSchema,
    required: true
  }],

  ingredients: [{
    type: IngredientSchema,
    required: true
  }],

});

export default RecipeSchema;