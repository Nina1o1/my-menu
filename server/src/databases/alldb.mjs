import mongoose from "mongoose";
import UserSchema from "./userdb.mjs";
import RecipeSchema from "./recipedb.mjs";
import CategorySchema from "./categorydb.mjs";

import "dotenv/config";

mongoose.connect(process.env.DATABASE_URL);

const User = mongoose.model('User', UserSchema);
const Category = mongoose.model('Category', CategorySchema);
const Recipe = mongoose.model('Recipe', RecipeSchema);

export {User, Category, Recipe};