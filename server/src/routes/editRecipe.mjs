import { Recipe } from "../databases/alldb.mjs";

async function editRecipeRouter (req, res) {

  const jwt = req.cookies?.jwt;
  if (!jwt) return res.sendStatus(401);
  const userid = JSON.parse(jwt)["userid"];

  // identify recipe_id to decide EDIT / ADD
  try {
    const newRecipe = new Recipe({
      author: userid,
      ...req.body
    });
    console.log(newRecipe);
    await newRecipe.save();
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(502);
  }  
}

export default editRecipeRouter;