import { Category } from "../databases/alldb.mjs";
async function addCategoryRouter (req, res) {
  const newCategory = req.body?.category;
  try {
    await Category.findOneAndUpdate(
      {"author": req.userid},
      {$push: {"categories": newCategory}}
    );
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(502);
  }
}
export default addCategoryRouter;