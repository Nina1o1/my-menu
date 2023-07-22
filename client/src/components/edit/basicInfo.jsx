import { LabelContainer, 
  ItemLabel, 
  BlockItemLabel, 
  TextContainer, 
  TextInput, 
  BlockItemInput } from "./editComponents";
import { useState, useEffect } from "react";
import { toggleStyle } from "../../common/utils/styleHelper"

function BasicInfo({recipe, currCategories}) {

  return(
    <>
      <LabelContainer>
        <ItemLabel label="Dish Name: "/>
        <ItemLabel label="Serve Size: "/>
        <BlockItemLabel label="Note: "/>
        <ItemLabel label="Categories: "/>
      </LabelContainer>

      <TextContainer>
        <TextInput id="dishname" value={recipe?.["dishname"]}/>
        <TextInput id="serveSize" value={recipe?.["serveSize"]}/>
        <BlockItemInput id="note" value={recipe?.["note"]}/>
        <EditCategories 
          currCategories={currCategories}
          value={recipe?.["categories"]}/>
      </TextContainer>
    </>
  )
}

function EditCategories({currCategories, value}){
  const styleCategories = currCategories?.map((category, i) => {
    const chosen = value?.includes(category);
    return <EachCategory category={category} chosen={chosen} key={i}/>;
  });
  return (
    <fieldset className="edit-fieldset">
      <div className="select-options">
        {styleCategories}
      </div>
    </fieldset>
  )
}

function EachCategory({category, chosen}){
  const [optionActive, setOptionActive] = useState("select-state");
  const toggle = toggleStyle("active");

  const categoryId = `categories-${category}`;

  useEffect(() => {
    if(chosen) setOptionActive(toggle(optionActive));
  },[]);
  
  function handleCheck(evt) {
    evt.stopPropagation();
    setOptionActive(toggle(optionActive));
  }

  function handleClick(evt) {
    evt.preventDefault();
    let clickEvent = new MouseEvent("click", {bubbles: true, cancelable: true, clientX: 100, clientY: 100});
    evt.currentTarget.firstChild.dispatchEvent(clickEvent);
  }

  return (
    <div className={`select-option ${optionActive}`} onClick={handleClick}>
      <input type="checkbox" className="select-check" id={categoryId} value={category} onClick={handleCheck}/>
      <label>{category}</label>
    </div>
  )
}

export default BasicInfo;