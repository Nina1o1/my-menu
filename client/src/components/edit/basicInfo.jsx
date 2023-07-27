import { LabelContainer, 
  ItemLabel, 
  BlockItemLabel, 
  TextContainer, 
  TextInput, 
  BlockItemInput } from "./editComponents";
import { useState, useEffect, useRef } from "react";
import { toggleStyle } from "../../common/utils/styleHelper";
import store from "../../app/store";
import { useDispatch } from "react-redux";
import { addCategory, selectCategories } from "../../features/categoriesSlice";
import useEditRecipe from "../../common/hooks/useEditRecipe";
import terms from "../../assets/terms.json";
import Popup from "../popup/popup";

function BasicInfo({recipe}) {
  const [currCategories, setCurrCategories] = useState([]);
  const [editCat, setEditCat] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const popupContent = useRef("");
  useEffect(() => {
    setCurrCategories(selectCategories(store.getState()));
  }, [editCat]);

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
          value={recipe?.["categories"]}
          setEditCat={setEditCat}
          popupContent={popupContent}
          setShowPopup={setShowPopup}/>
      </TextContainer>
      {showPopup
          ? <Popup content={popupContent.current} setDisplay={setShowPopup}/>
          : ""}
    </>
  )
}

function EditCategories({currCategories, value, setEditCat, popupContent, setShowPopup}){
  const styleCategories = currCategories?.map((category, i) => {
    const chosen = value?.includes(category);
    return <EachCategory category={category} chosen={chosen} key={i}/>;
  });
  return (
    <fieldset className="edit-fieldset">
      <div className="select-options">
        {styleCategories}
        <AddCategory 
          setEditCat={setEditCat}
          popupContent={popupContent}
          setShowPopup={setShowPopup}/>
      </div>
    </fieldset>
  )
}

function AddCategory({setEditCat, popupContent, setShowPopup}){
  const [isDisplayed, setIsDisplayed] = useState(false);
  const [displayComp, setDisplayComp] = useState("select-display-hide");
  const toggle = toggleStyle("hide");
  const inputRef = useRef("");
  const editRecipe = useEditRecipe();
  const dispatch = useDispatch();

  function handleDelete (evt) {
    evt.preventDefault();
    if(isDisplayed) {
      setIsDisplayed(false);
      setDisplayComp(toggle(displayComp));
    }
  }

  async function handleAdd(evt) {
    evt.preventDefault();
    // if input field is not displaying, display it
    if(!isDisplayed) {
      setIsDisplayed(true);
      setDisplayComp(toggle(displayComp));
      return;
    } 
    const newCat = inputRef.current.value;
    // if input field is displaying, post request & store in redux store
    if (newCat) {
      try {
        if (store.getState()?.categories.includes(newCat)) throw terms["edit-existCategory"];
        await editRecipe("addCategory", {"category": newCat});
        dispatch(addCategory(newCat));
        // reset input display style
        setEditCat(prev => ++prev);
        inputRef.current.value = "";
        setIsDisplayed(false);
        setDisplayComp(toggle(displayComp));
      } catch (error) {
        popupContent.current = terms["edit-existCategory"];
        setShowPopup(true);
        console.log("this is the error");
        console.log(error);
      }  
    }
  }

  return (
    <div className="select-add-container">
      <input type="text" className={`select-option ${displayComp}`} ref={inputRef}/>
      <button className="select-btn select-add-btn" onClick={handleAdd}>+</button>
      <button className={`select-btn select-del-btn ${displayComp}`} onClick={handleDelete}>-</button>
    </div>
  )
}
function EachCategory({category, chosen}){
  const [optionActive, setOptionActive] = useState("select-state");
  const inputRef = useRef(null);
  const toggle = toggleStyle("active");

  const categoryId = `categories-${category}`;
  const clickEvent = new MouseEvent("click", {bubbles: true, cancelable: true, clientX: 100, clientY: 100});

  useEffect(() => {
    if(chosen) inputRef.current.dispatchEvent(clickEvent);
  },[]);

  function handleCheck(evt) {
    evt.stopPropagation();
    setOptionActive(toggle(optionActive));
  }

  function handleClick(evt) {
    evt.preventDefault();
    inputRef.current.dispatchEvent(clickEvent);
  }

  return (
    <div className={`select-option ${optionActive}`} onClick={handleClick}>
      <input type="checkbox" className="select-check" id={categoryId} 
        value={category} 
        onClick={handleCheck} 
        ref={inputRef}/>
      <label>{category}</label>
    </div>
  )
}

export default BasicInfo;