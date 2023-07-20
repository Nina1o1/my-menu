import { Category } from "../databases/alldb.mjs";
async function addCategoryRouter (req, res) {
  const newCategory = req.body?.category;
  try {
    const found = await Category.findOneAndUpdate(
      {"author": req.userid},
      {$push: {"categories": newCategory}}
    );
    return res.status(200).send({"categories": newCategory});
  } catch (error) {
    console.log(error);
    return res.sendStatus(502);
  }
}
export default addCategoryRouter;