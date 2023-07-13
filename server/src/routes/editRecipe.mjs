import { Recipe } from "../databases/alldb.mjs";

function editRecipeRouter (req, res) {

  const jwt = req.cookies?.jwt;
  if (!jwt) return res.sendStatus(401);
  const userid = JSON.parse(jwt)["userid"];

  // identify recipe_id to decide EDIT / ADD
  try {
    
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(502);
  }  
}

export default editRecipeRouter;