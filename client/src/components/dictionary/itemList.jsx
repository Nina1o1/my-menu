import { useEffect, useState } from 'react';
import { modeToggleHelper } from './dictHelper';

function ItemList ({displayRecipes, handleClickRecipe, displayMode}) {
  const itemList = displayRecipes.map((recipe, i) => {
    return <Item
      recipe={recipe}
      handleClickRecipe={handleClickRecipe}
      displayMode={displayMode}
      key={i}/>
  });
  
  return(
    <ul className="dict-container"> {itemList} </ul>
  )
}

function Item ({recipe, handleClickRecipe, displayMode}) {
  const [dictItemStyle, setDictItemStyle] = useState("dict-item");
  const [itemStyle, setItemStyle] = useState("item-each");

  const ingredientList = recipe?.["ingredients"].map((ingred, i) => {
    return (<span key={i} className="item-ingdt">{ingred}</span>)
  });

  useEffect(() => {
    const styleToggle = modeToggleHelper(displayMode);
    setDictItemStyle(styleToggle(dictItemStyle));
    setItemStyle(styleToggle(itemStyle));
  },[displayMode]);
  return(
    <li className="dict-row">
      <a className={dictItemStyle} onClick={evt => {handleClickRecipe(evt, recipe["_id"])}}>
        <span className={itemStyle}> {recipe["dishname"]} </span>
        { displayMode
          ? ""
          : <span className="item-each"> {ingredientList} </span>}
      </a>
    </li>
  )
}

export default ItemList;