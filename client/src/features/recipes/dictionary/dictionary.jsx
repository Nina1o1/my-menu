import { useRef, useState, useEffect } from 'react';
import './dictionary.css';
import ItemList from './itemList';
import SearchBar from './searchBar';
import { recipeDictionary } from '../recipesSlice';
import store from "../../../app/store";
import useAxiosTooken from "../../../common/hooks/useAxiosTooken";


export default function Dictionary() {
  document.body.classList.remove("purple-page");

  const [displayRecipes, setDisplayRecipes] = useState([]);
  const [searchCount, setSearchCount] = useState(0);
  const inputText = useRef("");
  // TODO: search by category
  const selectedCategories = useRef([]);
  const axiosTookenProvider = useAxiosTooken();

  // find recipes and re-render when click on search button
  useEffect(() => {
    const foundRecipes = recipeDictionary(
      store.getState(),
      inputText.current.value
      );
    setDisplayRecipes(foundRecipes);
  }, [searchCount]);

  // read whole recipe from database (via recipe._id) when click on some specific recipe
  async function handleClickRecipe(evt, recipeId) {
    evt.preventDefault();

    try {
      const getOptions = {
        withCredentials: true
      }
      // post request
      const res = await axiosTookenProvider.get(`/findRecipe`,
        {params: { recipeId }},
        getOptions
      );
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  return(
    <>
      <SearchBar setSearchCount={setSearchCount} inputText = {inputText}/>
      <ItemList displayRecipes={displayRecipes} handleClickRecipe = {handleClickRecipe}/>
    </>
  )
}