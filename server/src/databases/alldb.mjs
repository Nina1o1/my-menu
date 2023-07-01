import mongoose from "mongoose";
import UserSchema from "./userdb.mjs";
import RecipeSchema from "./recipedb.mjs";
import FilterSchema from "./filterdb.mjs";

import "dotenv/config";

mongoose.connect(process.env.DATABASE_URL);

const User = mongoose.model('User', UserSchema);
const Filter = mongoose.model('Filter', FilterSchema);
const Recipe = mongoose.model('Recipe', RecipeSchema);

export {User, Filter, Recipe};