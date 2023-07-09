import mongoose, { Schema } from "mongoose";

const CategorySchema = new mongoose.Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    require: true
  },

  categories: [{ // TODO : unique for each user
    type: String,
    require: false
  }]
});

export default CategorySchema;