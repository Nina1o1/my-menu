import mongoose from "mongoose";
import UserSchema from "./userdb.mjs";
import RecipesSchema from "./recipedb.mjs";

// TODO: connect to server
mongoose.connect("mongodb://localhost/myRecipe");

const User = mongoose.model('User', UserSchema);
const Recipe = mongoose.model('Recipe', RecipesSchema);

export {User, Recipe};