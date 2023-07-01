import { Recipe } from "../databases/alldb.mjs";

function findRecipes(user) {
  return new Promise((fulfill, reject) => {
    Recipe.find({"author": user._id})
      .then(foundRecipes => fulfill(foundRecipes))
      .catch(error => reject(error))
  });
};
export default findRecipes;