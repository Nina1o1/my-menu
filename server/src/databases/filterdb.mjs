import mongoose, { Schema } from "mongoose";

const FilterSchema = new mongoose.Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    require: true
  },

  category: {
    type: String,
    require: true
  }
});

export default FilterSchema;