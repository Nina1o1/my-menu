import { Recipe } from "../databases/alldb.mjs";
async function deleteRecipeRouter (req, res) {
  try {
    const recipeId = req.body?.["recipeId"];
    if(!recipeId) throw "no recipe id recieved";

    const deletedRecipe = await Recipe.findByIdAndDelete(recipeId);
    return res.status(200).send({recipe: deletedRecipe});
  } catch (error) {
    return res.sendStatus(502);
  }
}

export default deleteRecipeRouter;