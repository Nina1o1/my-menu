import { useSelector } from 'react-redux';
import './dictionary.css';
import ItemList from './itemList';
import SearchBar from './searchBar';

export default function Dictionary() {
  document.body.classList.remove("purple-page");
  const testItems=[
    {dishname: "test",
    ingredients: [1,2,3,4,5]
    },
    {dishname: "test2",
    ingredients: [5,6,7,8,9]
    },
  ]

  // const readRecipes = useSelector(store => {
  //   console.log(store);
  //   return {
  //     dishname: store.recipes.dishname,
  //     ingredients: store.recipes.dishname
  //   }
  // });

  return(
    <>
      <SearchBar />
      <ItemList items={testItems}/>
    </>
  )
}