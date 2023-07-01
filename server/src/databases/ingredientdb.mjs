import mongoose from "mongoose";

const IngredientSchema = new mongoose.Schema({
  item: {
    type: String,
    require: true
  },

  amount: {
    type: String
  }
});

export default IngredientSchema;