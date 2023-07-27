import { Recipe, Category } from "../databases/alldb.mjs";
async function updateCategoryRouter(req, res) {
  const { target, input } = req?.body;
  try {
    // update category
    const foundCat = await Category.findOne({author: req.userid});
    const editCat = foundCat?.["categories"];
    editCat.splice(editCat.indexOf(target), 1, input);
    await Category.findOneAndUpdate({author: req.userid}, {"categories": editCat});

    // update recipe
    const foundRecipes = await Recipe.find({author: req.userid});
    foundRecipes?.forEach(async (recipe) => {
      const recipeCat = recipe?.["categories"];
      recipeCat.splice(editCat.indexOf(target), 1, input);
      await Recipe.findOneAndUpdate({_id: recipe._id}, {categories: recipeCat});
    });
    return res.sendStatus(200);
  } catch (error) {
    console.log("error");
  }
}

export default updateCategoryRouter;