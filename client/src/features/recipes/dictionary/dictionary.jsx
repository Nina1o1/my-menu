import { useSelector } from 'react-redux';
import './dictionary.css';
import ItemList from './itemList';
import SearchBar from './searchBar';
import { readRecipes } from '../recipesSlice';

export default function Dictionary() {
  document.body.classList.remove("purple-page");

  // TODO: handle rerenders
  const currRecipes = useSelector(readRecipes);
  // console.log(currRecipes);

  return(
    <>
      <SearchBar />
      <ItemList items={currRecipes}/>
    </>
  )
}