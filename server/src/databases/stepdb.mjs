import mongoose from "mongoose";

const StepSchema = new mongoose.Schema({
  description: {
    type: String, 
    require: true
  },
  
  image: String // TODO image
});

export default StepSchema;