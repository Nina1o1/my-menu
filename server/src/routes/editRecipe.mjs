import { Recipe } from "../databases/alldb.mjs";

async function editRecipeRouter (req, res) {

  // read user id from cookie
  const jwt = req.cookies?.jwt;
  if (!jwt) return res.sendStatus(401);
  const userid = JSON.parse(jwt)["userid"];

  // TODO: identify recipe_id to decide EDIT / ADD
  return res.sendStatus(200);
  try {
    const newRecipe = new Recipe({
      author: userid,
      ...req.body
    });
    await newRecipe.save();
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(502);
  }  
}

export default editRecipeRouter;