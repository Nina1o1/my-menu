import "./folderDisplay.css";
import store from "../../app/store";
import { selectFolderRecipe } from "../../features/recipesSlice";
import { useNavigate } from "react-router-dom";

function FolderShow({currCategory}) {
  const navigate = useNavigate();
  function handleClickBack(evt) {
    evt.preventDefault();
    navigate(-1);
  }

  let styleFoundRecipes = "";
  // find recipes under this category
  const foundRecipes = selectFolderRecipe(store.getState(), currCategory);
  if (foundRecipes?.length) {
    styleFoundRecipes = foundRecipes?.map((recipe, i) => {
      return <li className="folderdisplaylist-recipe" key={i}>{recipe["dishname"]}</li>
    });
  }
  
  return(
    <div className="folderShow-container">
      <img className="folder-btn folder-back" src="/back.png" onClick={handleClickBack}/>
      <ul className="folderShow-list-container">
        {styleFoundRecipes}
      </ul>
    </div>
  )
}

export default FolderShow;