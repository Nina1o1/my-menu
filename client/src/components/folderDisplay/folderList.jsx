import { useRef, useState } from "react";
import "./folderDisplay.css";
import terms from "../../assets/terms.json"
import store from "../../app/store";
import useEditRecipe from "../../common/hooks/useEditRecipe";
import { useDispatch } from "react-redux";
import { addCategory } from "../../features/categoriesSlice";
import Popup from "../popup/popup";

function FolderList({foundCategories, setCurrCategory, currCategory}) {

  const [showOtherRecipes, setShowOtherRecipes] = useState(false);
  const [showCreateNew, setShowCreateNew] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showRename, setShowRename] = useState(false);
  const editRecipe = useEditRecipe();
  const dispatch = useDispatch();


  async function fetchShowRename(dispatch, editRecipe, newCat) {
    console.log(newCat);
  }

  async function handleClickDelete(){
    setShowDelete(false);
  }

  async function fetchShowCreateNew(newCat) {
    const retCategory = await editRecipe("addCategory", {"category": newCat});
    dispatch(addCategory(retCategory));
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
                fetchFunc={fetchShowRename}/>
            : <Btn content="rename" handleClick={handleRename}/>}
          {showCreateNew
            ? <CategoryInput 
                placeholder="create new"
                setDisplay={setShowCreateNew}
                fetchFunc={fetchShowCreateNew}/>
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
    </>
  )
}

function CategoryInput({placeholder, setDisplay, fetchFunc}){
  const inputRef = useRef("");
  // const editRecipe = useEditRecipe();
  // const dispatch = useDispatch();

  async function handleAdd(evt) {
    evt.preventDefault();
    const newCat = inputRef?.current?.value;
    if (newCat) {
      try {
        if (store.getState()?.categories.includes(newCat)) throw "category already exists";
        await fetchFunc(newCat);
        // await fetchFunc(dispatch, editRecipe, newCat);
        inputRef.current.value = "";
        setDisplay(false);
      } catch (error) {
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
function Categories({foundCategories, setCurrCategory}){
  const styleCategories = foundCategories?.map((category, i) => {
    return <EachCategory category={category} setCurrCategory={setCurrCategory} key={i} />
  });

  return <ul> {styleCategories} </ul>
}
function EachCategory({category, setCurrCategory}) {
  function handleClick() {
    setCurrCategory(category);
  }
  return <li className="folderdisplaylist-item" onClick={handleClick}>{category}</li>
}

function Btn({content, handleClick}){
  return (
    <button className="folderdisplay-btn" onClick={handleClick}>{`- ${content}`}</button>
  )
}

export default FolderList;