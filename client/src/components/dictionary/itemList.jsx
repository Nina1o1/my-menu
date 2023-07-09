function ItemList (props) {
  const itemList = props.items.map((item, i) => {
    return <Item name={item.name} ingredients={item.ingredients} key={i}/>
  })
  return(
    <ul className="dict-container">
      {itemList}
    </ul>
  )
}

function Item (props) {
  const ingredientList = props.ingredients.map((ingred, i) => {
    return (<span key={i}>{ingred} </span>)
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

export default ItemList;