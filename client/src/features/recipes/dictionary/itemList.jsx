function ItemList ({displayRecipes, handleClickRecipe}) {
  const itemList = displayRecipes.map((recipe, i) => {
    return <Item recipe={recipe} handleClickRecipe={handleClickRecipe} key={i}/>
  })
  return(
    <ul className="dict-container">
      {itemList}
    </ul>
  )
}

function Item ({recipe, handleClickRecipe}) {
  const ingredientList = recipe["ingredients"].map((ingred, i) => {
    return (<span key={i} className="item-ingdt">{ingred}</span>)
  })

  return(
    <li className="dict-row">
      <a className="dict-item" onClick={evt => {handleClickRecipe(evt, recipe["_id"])}}>
        <span className="item-each"> {recipe["dishname"]} </span>
        <span className="item-each"> {ingredientList} </span>
      </a>
    </li>
  )
}

export default ItemList;