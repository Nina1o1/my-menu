import { Recipe, Category } from "../databases/alldb.mjs";
async function deleteCategoryRouter(req,res) {

  const { target } = req?.body;
  try {
    const foundCat = await Category.findOne({author: req.userid});
    const editCat = foundCat?.["categories"];
    editCat.splice(editCat.indexOf(target), 1);
    await Category.findOneAndUpdate({author: req.userid}, {"categories": editCat});

    const foundRecipes = await Recipe.find({author: req.userid});
    foundRecipes?.forEach(async (recipe) => {
      const recipeCat = recipe?.["categories"];
      recipeCat.splice(editCat.indexOf(target), 1);
      await Recipe.findOneAndUpdate({_id: recipe._id}, {categories: recipeCat});
    });
    return res.sendStatus(200);
  } catch (error) {
    res.sendStatus(502);
  }
}

export default deleteCategoryRouter;