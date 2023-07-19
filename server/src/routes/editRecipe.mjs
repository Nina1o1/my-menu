import { Recipe } from "../databases/alldb.mjs";

async function editRecipeRouter (req, res) {

  // read user id from cookie
  const jwt = req.cookies?.jwt;
  if (!jwt) return res.sendStatus(401);
  const userid = JSON.parse(jwt)["userid"];

  try {
    const readRecipe = req.body;
    const recipeId = readRecipe?.["_id"];
    delete readRecipe?.["_id"];
    const newRecipe = {
      author: userid,
      ...readRecipe
    }

    let editedRecipe;
    if(recipeId) {
      editedRecipe = await Recipe.findByIdAndUpdate(recipeId, newRecipe, {new: true});
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