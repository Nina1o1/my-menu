import mongoose from "mongoose";
import UserSchema from "./userdb.mjs";
import RecipeSchema from "./recipedb.mjs";
import "dotenv/config";

mongoose.connect(process.env.DATABASE_URL);

const User = mongoose.model('User', UserSchema);
const Recipe = mongoose.model('Recipe', RecipeSchema);

export {User, Recipe};