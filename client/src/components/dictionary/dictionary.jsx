import { useRef, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './dictionary.css';
import ItemList from './itemList';
import SearchBar from './searchBar';
import Display from '../display/display';
import { recipeDictionary } from '../../features/recipesSlice';
import store from "../../app/store";
import useAxiosTooken from "../../common/hooks/useAxiosTooken";
import useLogout from '../../common/hooks/useLogout';
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
  const [clickedRecipe, setClickedRecipe] = useState(null);
  // sucure fetch api
  const axiosTookenProvider = useAxiosTooken();
  // hooks for logout
  const resetUserInfo = useLogout();
  const location = useLocation();
  const navigate = useNavigate();

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
      <SearchBar 
        setSearchCount={setSearchCount} 
        inputText = {inputText}
        displayMode = {displayMode}/>
      <ItemList
        displayRecipes={displayRecipes}
        handleClickRecipe = {handleClickRecipe}
        displayMode={displayMode}/>
      
      {displayMode
        ? <Display recipe = {clickedRecipe} setdisplayMode={setdisplayMode}/>
        : "" }

    </>
  )
}