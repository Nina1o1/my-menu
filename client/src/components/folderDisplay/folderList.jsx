import { useRef, useState } from "react";
import "./folderDisplay.css";
import terms from "../../assets/terms.json"
import store from "../../app/store";
import useEditRecipe from "../../common/hooks/useEditRecipe";
import { useDispatch } from "react-redux";
import { addCategory } from "../../features/categoriesSlice";
import Popup from "../popup/popup";
import Categories from "./folderCategories";
// import { CategoryInput, Btn } from "./folderInputCategory"

function FolderList({setFoundCategories, foundCategories, setCurrCategory, currCategory}) {

  // booleans to control popup window
  const [showPopup, setShowPopup] = useState(false);
  const popupContent = useRef("");
  const popupClickRight = useRef(undefined);
  // booleans to control if a feature displays or not
  const [showOtherRecipes, setShowOtherRecipes] = useState(false);
  const [showCreateNew, setShowCreateNew] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showRename, setShowRename] = useState(false);
  // fetch & redux hooks
  const dispatch = useDispatch();
  const editRecipe = useEditRecipe();


  async function fetchShowRename(newCat, setCurrCategory, setFoundCategories, currCategory) {
    console.log(newCat);
    setCurrCategory(newCat);
    setFoundCategories(prev => {
      return prev.map(ele => {
        if(ele === currCategory) return newCat;
        else return ele;
      });
    })
  }

  async function handleClickDelete(){
    setShowDelete(false);
  }

  async function fetchShowCreateNew(newCat, setCurrCategory, setFoundCategories) {
    const retCategory = await editRecipe("addCategory", {"category": newCat});
    dispatch(addCategory(retCategory));
    setCurrCategory(newCat);
    setFoundCategories(prev => [...prev, newCat]);
  }

  function handleRename(evt) {
    evt.preventDefault();
    if(showOtherRecipes) setShowOtherRecipes(false);
    if(showCreateNew) setShowCreateNew(false);
    if(showDelete) setShowDelete(false);
    setShowRename(prev => !prev);
  }
  function handleCreateNew(evt) {
    evt.preventDefault();
    if(showOtherRecipes) setShowOtherRecipes(false);
    if(showRename) setShowRename(false);
    if(showDelete) setShowDelete(false);
    setShowCreateNew(prev => !prev);
  }
  function handleDelete(evt){
    evt.preventDefault();
    if(showOtherRecipes) setShowOtherRecipes(false);
    if(showCreateNew) setShowCreateNew(false);
    if(showRename) setShowRename(false);
    setShowDelete(prev => !prev);
  }
  function handleShowOtherRecipes(evt){
    evt.preventDefault();
    if(showCreateNew) setShowCreateNew(false);
    if(showRename) setShowRename(false);
    if(showDelete) setShowDelete(false);
    setShowOtherRecipes(prev => !prev);
  }

  return(
    <>
      <div className="folderdisplaylist-container">
        <h1 className="folderdisplaylist-header"> {currCategory} </h1>
        <div className="folderdisplay-btns-container">
          {showRename
            ? <CategoryInput
                placeholder="rename"
                setDisplay={setShowRename}
                fetchFunc={fetchShowRename}
                popupContent={popupContent}
                setShowPopup={setShowPopup}
                setFoundCategories={setFoundCategories}
                setCurrCategory={setCurrCategory}
                currCategory={currCategory}/>
            : <Btn content="rename" handleClick={handleRename}/>}
          {showCreateNew
            ? <CategoryInput 
                placeholder="create new"
                setDisplay={setShowCreateNew}
                fetchFunc={fetchShowCreateNew}
                popupContent={popupContent}
                setShowPopup={setShowPopup}
                setFoundCategories={setFoundCategories}
                setCurrCategory={setCurrCategory}/>
            : <Btn content="create new" handleClick={handleCreateNew}/>}
          <Btn content="delete" handleClick={handleDelete}/>
          <Btn content="other recipes" handleClick={handleShowOtherRecipes}/>
        </div>
        <div className="folderdisplaylist-box">
          {showOtherRecipes
            ? <Categories foundCategories={foundCategories} setCurrCategory={setCurrCategory}/>
            : ""}
        </div>
        {showDelete
            ? <Popup 
                content={terms["category-delete"]}
                setDisplay={setShowDelete}
                handleClickRight={handleClickDelete}/>
            : ""}
      </div>
      {showPopup
        ? <Popup 
        content={popupContent.current}
        setDisplay={setShowPopup}
        handleClickRight={popupClickRight.current}/>
        : ""}
    </>
  )
}

function CategoryInput({
  placeholder, setDisplay, fetchFunc, 
  popupContent, setShowPopup, 
  setFoundCategories, setCurrCategory, currCategory}){
  const inputRef = useRef("");

  async function handleAdd(evt) {
    evt.preventDefault();
    const newCat = inputRef?.current?.value;
    if (newCat) {
      try {
        if (store.getState()?.categories.includes(newCat)) throw terms["edit-existCategory"];
        // fetch func to create new / rename
        await fetchFunc(newCat, setCurrCategory, setFoundCategories, currCategory);
        inputRef.current.value = "";
        setDisplay(false);
      } catch (error) {
        if (error === terms["edit-existCategory"]) {
          popupContent.current = terms["edit-existCategory"];
          setShowPopup(true);
        }
        console.log(error);
      }
    }
  }
  function handleClose(evt) {
    evt.preventDefault();
    setDisplay(false);
  }
  return(
    <form className="folderdisplaylist-new">
      <input type="text" className="text" placeholder={`- ${placeholder}`} ref={inputRef}/>
      <button className="folderdisplaylist-new-btn" onClick={handleAdd}>add</button>
      <button className="folderdisplaylist-new-btn" onClick={handleClose}>close</button>
    </form>
  )
}

function Btn({content, handleClick}){
  return  <button className="folderdisplay-btn" onClick={handleClick}>{`- ${content}`}</button>
}

export default FolderList;