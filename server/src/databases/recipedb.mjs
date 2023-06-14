import mongoose from "mongoose";

const RecipesSchema = new mongoose.Schema({
  name: {
    type: String, 
    required: true
  },

  ingredients: [{
    type: String, required: true
  }],

  description: {
    type: String
  },

  image: {
    type:String
  }// TODO: Mongoose imageg
});

export default RecipesSchema

