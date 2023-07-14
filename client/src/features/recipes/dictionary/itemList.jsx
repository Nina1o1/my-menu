function ItemList (props) {
  const itemList = props.items.map((item, i) => {
    return <Item dishname={item.dishname} ingredients={item.ingredients} key={i}/>
  })
  return(
    <ul className="dict-container">
      {itemList}
    </ul>
  )
}

function Item (props) {
  const ingredientList = props.ingredients.map((ingred, i) => {
    return (<span key={i} className="item-ingdt">{ingred}</span>)
  })

  return(
    <li className="dict-row">
      <a href="#" className="dict-item">
        <span className="item-each">{props.dishname}</span>
        <span className="item-each">
          {ingredientList}
          </span>
      </a>
    </li>
  )
}

export default ItemList;