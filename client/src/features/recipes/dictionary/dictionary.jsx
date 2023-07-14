import { useRef, useState, useEffect } from 'react';
import './dictionary.css';
import ItemList from './itemList';
import SearchBar from './searchBar';
import { recipeDictionary } from '../recipesSlice';
import store from "../../../app/store";

export default function Dictionary() {
  document.body.classList.remove("purple-page");

  // re-render found recipes upon state change
  const [displayRecipes, setDisplayRecipes] = useState([]);
  const [searchCount, setSearchCount] = useState(0);
  const selectedCategories = useRef([]);
  const inputText = useRef("");

  useEffect(() => {
    const foundRecipes = recipeDictionary(store.getState(), inputText.current.value);
    setDisplayRecipes(foundRecipes);
  }, [searchCount]);

  return(
    <>
    <SearchBar setSearchCount={setSearchCount} inputText = {inputText}/>
      {/* <SearchBar inputText = {inputText}/> */}
      <ItemList items={displayRecipes}/>
    </>
  )
}