import { Recipe } from "../databases/alldb.mjs";
async function deleteRecipeRouter (req, res) {
  try {
    const recipeId = req.body?.["recipeId"];
    if(!recipeId) throw "no recipeId recieved";

    await Recipe.findByIdAndDelete(recipeId);
    return res.sendStatus(200);
  } catch (error) {
    return res.sendStatus(502);
  }
}

export default deleteRecipeRouter;