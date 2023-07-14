import { useSelector } from 'react-redux';
import { useRef, useState } from 'react';
import './dictionary.css';
import ItemList from './itemList';
import SearchBar from './searchBar';
import { readRecipes } from '../recipesSlice';

export default function Dictionary() {
  document.body.classList.remove("purple-page");

  const [currRecipes, setCurrRecipes] = useState([]);
  const selectedCategories = useRef([]);
  const inputText = useRef("testme");

  // TODO: handle rerenders
  currRecipes.current = useSelector(readRecipes);
  console.log(inputText.current);

  return(
    <>
      <SearchBar inputText = {inputText}/>
      <ItemList items={currRecipes}/>
    </>
  )
}