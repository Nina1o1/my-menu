import { Link } from "react-router-dom";
import store from "../../app/store";
import { selectFolderRecipe } from "../../features/recipesSlice";
function FolderList({foundCategories}) {

  const styleCategories = foundCategories?.map((category, i) => {
    return <EachCategory category={category} key={i} />
  });
  
  return(
    <>
    <div className="folderlist-container">
      {styleCategories}
    </div>
    </>
  )
}

function EachCategory({category}) {
  let styleFoundRecipes = "";
  // display 5 recipes under this category
  const findFiveRecipes = selectFolderRecipe(store.getState(), category, 5);
  if (findFiveRecipes?.length) {
    styleFoundRecipes = findFiveRecipes?.map((recipe, i) => {
      return <li key={i}>{recipe["dishname"]}</li>
    });
  }

  return(
    <Link to="/folder_display" state={{category}}>
      <div className="eachfolder-container">
        <h1 className="eachfolder-header">
          {category}
        </h1>
        <ul className="eachfolder-recipe-container">
          {styleFoundRecipes}
        </ul>
      </div>
    </Link>
  )
}

export default FolderList;