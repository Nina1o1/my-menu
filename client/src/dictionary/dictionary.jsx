import './dictionary.css'

export default function Dictionary() {
  document.body.classList.remove("access-page")
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

function SearchBar() {
  return(
    <div className="search-container">
      <button type="submit" className="search-btn">Search</button>
      <input type="text" name="search" className="search-bar text" placeholder="What do you have for the next meal?" />
    </div>
  )
}

// items

function ItemList (props) {
  const itemList = props.items.map(item => {
    return <Item name={item.name} ingredients={item.ingredients}/>
  })
  return(
    <ul className="dict-container">
      {itemList}
    </ul>
  )
}

// name / ingredients

function Item (props) {
  const ingredientList = props.ingredients.map(ingred => {
    return (<span>{ingred} </span>)
  })

  return(
    <li className="dict-row">
      <a href="#" className="dict-item">
        <span className="item-each">{props.name}</span>
        <span className="item-each">
          {ingredientList}
          </span>
      </a>
    </li>
  )
}