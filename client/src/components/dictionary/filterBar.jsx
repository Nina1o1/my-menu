import { useState } from "react";
import { toggleStyle } from "../../common/utils/styleHelper"

function FilterBar({displayCategories, chooseCategories, setSearchCount}) {
  if (!displayCategories?.length) return;
  const styleCategory = displayCategories.map((ele, i) => {
    return (
      <EachCategory 
        category={ele} 
        chooseCategories={chooseCategories}
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

function EachCategory({category, chooseCategories, setSearchCount}) {

  const [categoryActive, setCategoryActive] = useState("category-state");
  const toggle = toggleStyle("active");

  // push selected category into chooseCategories ref and re-render
  function handleClick(evt){
    evt.preventDefault();
    const currSelect = chooseCategories.current;

    if(currSelect.includes(category)){
      const targetIndex = currSelect.indexOf(category);
      currSelect.splice(targetIndex, 1);
      chooseCategories.current = currSelect;
    } else {
      chooseCategories.current = [...currSelect, category];
    }
    setSearchCount(prev => ++prev);
    setCategoryActive(toggle(categoryActive));
  }

  return(
    <div className={`each-category ${categoryActive}`} onClick={handleClick}>{category}</div>
  )
}
export default FilterBar;