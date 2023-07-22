import { useState } from "react";
import { styleToggleHelper } from "./dictHelper";

function FilterBar({displayCategories, selectCategories, setSearchCount}) {
  if (!displayCategories?.length) return;
  const styleCategory = displayCategories.map((ele, i) => {
    return (
      <EachCategory 
        category={ele} 
        selectCategories={selectCategories}
        setSearchCount={setSearchCount}
        key={i}/>
    )
  });
  return (
    <div className="category-container">
      {styleCategory}
    </div>
  )
}

function EachCategory({category, selectCategories, setSearchCount}) {

  const [categoryActive, setCategoryActive] = useState("category");
  const styleToggle = styleToggleHelper("active");

  // push selected category into selectCategories ref and re-render
  function handleClick(evt){
    evt.preventDefault();
    const currSelect = selectCategories.current;

    if(currSelect.includes(category)){
      const targetIndex = currSelect.indexOf(category);
      currSelect.splice(targetIndex, 1);
      selectCategories.current = currSelect;
    }else{
      selectCategories.current = [...currSelect, category];
    }
    setSearchCount(prev => ++prev);
    setCategoryActive(styleToggle(categoryActive));
  }

  return(
    <div className={`each-category ${categoryActive}`} onClick={handleClick}>{category}</div>
  )
}
export default FilterBar;