import store from "../../app/store";
import { selectFolderRecipe } from "../../features/recipesSlice";
function FolderList({foundCategories, setActiveCategory}) {

  const styleCategories = foundCategories?.map((category, i) => {
    return (
      <EachCategory 
        category={category} 
        setActiveCategory={setActiveCategory} 
        key={i} />
    )
  });
  return(
    <>
    <div className="folderlist-container">
      {styleCategories}
    </div>
    </>
  )
}

function EachCategory({category, setActiveCategory}) {
  const findFiveRecipes = selectFolderRecipe(store.getState(), category, 5);
  // display 5 recipes under this category
  let styleFoundRecipes = "";
  if (findFiveRecipes?.length) {
    styleFoundRecipes = findFiveRecipes?.map((recipe, i) => {
      return(
        <li key={i}>{recipe["dishname"]}</li>
      )
    });
  }
  function handleClick() {
    setActiveCategory(category);
  }

  return(
    <div className="eachfolder-container" onClick={handleClick}>
      <h1 className="eachfolder-header">
        {category}
      </h1>
      <ul className="eachfolder-recipe-container">
        {styleFoundRecipes}
      </ul>
    </div>
  )
}

export default FolderList;