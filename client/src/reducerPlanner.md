A Sample Recipe Reducer
```json
// create a new recipe
{"type": "recipes/add", "payload": "recipeObj"} // Object
// delete a recipe
{"type": "recipes/deleteRecipe", "payload": "recipeId"} // String (id)

// update a name
{"type": "recipes/updateName", "payload": "recipeName"} // String

// add a category
{"type": "recipes/addCategory", "payload": "categoryName"} // String
// remove a category
{"type": "recipes/deleteCategory", "payload": "categoryId"} // String (id)

// update note
{"type": "recipes/updateNote", "payload": "recipeNote"} // String
// update image
{"type": "recipes/updateImage", "payload": "recipeImg"} // TODO: String

// add a new step
{"type": "recipes/addStep", "payload": "stepObj"} // Object
// update step "description" / "image"
{"type": "recipes/updateStep", "payload": "stepId", "stepKey", "stepValue"} // {String (id), String, String}
// delete a step
{"type": "recipes/deleteStep", "payload": "stepId"} // String (id)

// add a new ingredient
{"type": "recipes/addIngredient", "payload": "ingredientObj"} // Object
// updaet ingredients "item" / "amount"
{"type": "recipes/updateIngredient", "payload": ["ingredientId", "ingredientKey", "ingredientValue"]} // {String (id), String, String}
// delete a ingredient
{"type": "recipes/deleteIngredient", "payload": "ingredientId"} // String id
```
A Sample Recipe
```json
{
    "_id": "123",
    "name": "boiled egg",
    "categories": ["fav"], // name of category, rather than id
    "note": "Heathy and easy!",
    "image": "", // TODO: link to dish image
    "steps": [
      {
        "description": "boil the water till bubbling",
        "image": ""
      },
      {
        "description": "boil the egg for 5 minutes"
      },
    ],
    "ingredients": [
      {
        "item": "egg",
        "amount": "as you want"
      },
      {
        "item": "water",
        "amount": "pour until eggs aresubmerged"
      }
    ]
  }
```
A Sample filter reducer
```json
{
  // create a category
  {"type": "filter/addCategory", "payload": "categoryName"} // String
  // edit a category
  {"type": "filter/updateCategory", "payload": ["categoryName"]} // String
  // delete a category
  {"type": "filter/deleteCategory", "payload": "categoryName"} // String
}
```
A Sample filter
```json
{
  "categoties": ["fav", "wannatry"]
}
```