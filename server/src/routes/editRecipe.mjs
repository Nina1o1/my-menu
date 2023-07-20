import { Recipe } from "../databases/alldb.mjs";

async function editRecipeRouter (req, res) {

  try {
    const readRecipe = req.body;
    const recipeId = readRecipe?.["_id"];
    delete readRecipe?.["_id"];
    const newRecipe = {
      author: req.userid,
      ...readRecipe
    }

    let editedRecipe;
    if(recipeId) {
      editedRecipe = await Recipe.findByIdAndUpdate(recipeId, newRecipe, {new: true});
      console.log("edited recipe: ", editedRecipe);
    }
    else {
      editedRecipe = await new Recipe(newRecipe).save();
    }
    return res.status(200).send({recipe: editedRecipe});
  } catch (error) {
    console.log(error);
    return res.sendStatus(502);
  }  
}

export default editRecipeRouter;