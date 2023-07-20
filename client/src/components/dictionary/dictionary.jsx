import { useRef, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// styling and components
import './dictionary.css';
import ItemList from './itemList';
import FilterBar from './filterBar';
import SearchBar from './searchBar';
import Display from '../display/display';
import { styleToggleHelper } from './dictHelper';
// redux
import { recipeDictionary } from '../../features/recipesSlice';
import store from "../../app/store";
// auth hooks
import useAxiosTooken from "../../common/hooks/useAxiosTooken";
import useLogout from '../../common/hooks/useLogout';

export default function Dictionary() {
  document.body.classList.remove("purple-page");

  // states to read and select recipes
  const [displayRecipes, setDisplayRecipes] = useState([]);
  const [displayCategories, setDisplayCategories] = useState([]);
  const [searchCount, setSearchCount] = useState(0);
  const inputText = useRef("");
  // TODO: search by category
  const selectedCategories = useRef([]);
  // states to manage display mode
  const [displayMode, setdisplayMode] = useState(false);
  const [dictContainerStyle, setDictContainerStyle] = useState("dictionary-container");
  const [showpageContainerStyle, setShowpageContainerStyle] = useState("showpage-container");
  const [clickedRecipe, setClickedRecipe] = useState(null);
  // fetch api
  const axiosTookenProvider = useAxiosTooken();
  // hooks for logout
  const resetUserInfo = useLogout();
  const location = useLocation();
  const navigate = useNavigate();

  // show all categories
  

  // find recipes and re-render when click on search button
  useEffect(() => {
    const foundRecipes = recipeDictionary(
      store.getState(),
      inputText.current.value
    );
    setDisplayRecipes(foundRecipes);
    }, [searchCount]);

  // when edit page sends a recipe, display it
  useEffect(() => {
    if(location?.state?.recipe) {
      setClickedRecipe(location?.state?.recipe);
      setdisplayMode(true);
    }
  }, [location?.state?.recipe]);
  
  // change component style when display mode changes
  useEffect(() => {
    const styleToggle = styleToggleHelper(displayMode);
    setDictContainerStyle(styleToggle(dictContainerStyle));
    setShowpageContainerStyle(styleToggle(showpageContainerStyle));
  },[displayMode]);

  // read whole recipe from database (via recipe._id) when click on recipe list
  async function handleClickRecipe(evt, recipeId) {
    evt.preventDefault();
    try {
      const res = await axiosTookenProvider.get(`/findRecipe`,
        { params: { recipeId } },
        { withCredentials: true }
      );
      setClickedRecipe(res.data);
      setdisplayMode(true);
    } catch (error) {
      console.log(error);
      resetUserInfo();
      navigate("/login", {state: {from: location}});
    }
  }


  return(
    <>
      <div className={showpageContainerStyle}>

       <div className={dictContainerStyle}>
          <SearchBar 
            setSearchCount={setSearchCount} 
            inputText = {inputText}
            displayMode = {displayMode}/>
          <FilterBar
            displayCategories = {displayCategories}/>
          <ItemList
            displayRecipes={displayRecipes}
            handleClickRecipe = {handleClickRecipe}
            displayMode={displayMode}/>
        </div>

        {displayMode
          ? <Display recipe = {clickedRecipe} setdisplayMode={setdisplayMode}/>
          : "" }

      </div>
    </>
  )
}