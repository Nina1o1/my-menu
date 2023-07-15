import { useRef, useState, useEffect } from 'react';
import './dictionary.css';
import ItemList from './itemList';
import SearchBar from './searchBar';
import { recipeDictionary } from '../recipesSlice';
import store from "../../../app/store";
import useAxiosTooken from "../../../common/hooks/useAxiosTooken";
import { styleToggleHelper } from './dictHelper';

export default function Dictionary() {
  document.body.classList.remove("purple-page");

  // states to read and select recipes
  const [displayRecipes, setDisplayRecipes] = useState([]);
  const [searchCount, setSearchCount] = useState(0);
  const inputText = useRef("");
  // TODO: search by category
  const selectedCategories = useRef([]);
  // states to manage display mode
  const [displayMode, setdisplayMode] = useState(false);
  const [dictContainerStyle, setDictContainerStyle] = useState("dictionary-container");
  // fetch api
  const axiosTookenProvider = useAxiosTooken();

  // find recipes and re-render when click on search button
  useEffect(() => {
    const foundRecipes = recipeDictionary(
      store.getState(),
      inputText.current.value
      );
    // click to set style mode to false
    setDisplayRecipes(foundRecipes);
  }, [searchCount]);

  // read whole recipe from database (via recipe._id) when click on recipe list
  async function handleClickRecipe(evt, recipeId) {
    evt.preventDefault();
    try {
      const res = await axiosTookenProvider.get(`/findRecipe`,
        { params: { recipeId } },
        { withCredentials: true }
      );
      // console.log(res.data);
      setdisplayMode(true);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const styleToggle = styleToggleHelper(displayMode);
    setDictContainerStyle(styleToggle(dictContainerStyle));
  },[displayMode])
  return(
    <>
      <div className={dictContainerStyle}>
        <SearchBar 
          setSearchCount={setSearchCount} 
          inputText = {inputText}
          displayMode = {displayMode}/>
        <ItemList
          displayRecipes={displayRecipes}
          handleClickRecipe = {handleClickRecipe}
          displayMode={displayMode}/>
      </div>
    </>
  )
}