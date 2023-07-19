import { Recipe } from "../databases/alldb.mjs";

async function findRecipeRouter(req, res) {
  const recipeId = req.query.recipeId;
  try {
    const foundRecipe = await Recipe.findById(req.query.recipeId);
    return res.send(foundRecipe);
  } catch (error) {
    console.log(error);
    return res.sendStatus(502);
  }
}
export default findRecipeRouter;