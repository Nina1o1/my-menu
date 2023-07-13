import './dictionary.css'
import ItemList from './itemList';
import SearchBar from './searchBar';

export default function Dictionary() {
  document.body.classList.remove("purple-page");
  const testItems=[
    {name: "test",
    ingredients: [1,2,3,4,5]
    },
    {name: "test2",
    ingredients: [5,6,7,8,9]
    },
  ]

  return(
    <>
      <SearchBar />
      <ItemList items={testItems}/>
    </>
  )
}