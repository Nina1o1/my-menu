import { useRef, useState } from "react";
import "./folderDisplay.css";
import store from "../../app/store";
import useEditRecipe from "../../common/hooks/useEditRecipe";
import { useDispatch } from "react-redux";
import { addCategory } from "../../features/categoriesSlice";
function FolderList({foundCategories, setCurrCategory, currCategory}) {

  const [showOtherRecipes, setShowOtherRecipes] = useState(false);
  const [showCreateNew, setShowCreateNew] = useState(false);
  function handleCreateNew(evt) {
    evt.preventDefault();
    if(showOtherRecipes) setShowOtherRecipes(false);
    setShowCreateNew(prev => !prev);
  }
  function handleShowOtherRecipes(evt){
    evt.preventDefault();
    if(showCreateNew) setShowCreateNew(false);
    setShowOtherRecipes(prev => !prev);
  }
  return(
    <>
      <div className="folderdisplaylist-container">
        <h1 className="folderdisplaylist-header"> {currCategory} </h1>
        <div className="folderdisplay-btns-container">
          <Btn content="rename"/>
          <Btn content="delete"/>
          <Btn content="create new" 
            handleClick={handleCreateNew}
            setShowCreateNew={setShowCreateNew}/>
          <Btn content="other recipes" 
            handleClick={handleShowOtherRecipes}/>
        </div>
        <div className="folderdisplaylist-box"> 
          {showCreateNew
            ? <CreateNew />
            : ""}
          {showOtherRecipes
            ? <Categories foundCategories={foundCategories} setCurrCategory={setCurrCategory}/>
            : ""}
        </div>
      </div>
    </>
  )
}

function CreateNew(){
  const inputRef = useRef("");
  const editRecipe = useEditRecipe();
  const dispatch = useDispatch();

  async function handleAdd(evt) {
    evt.preventDefault();
    const newCat = inputRef?.current?.value;
    if (newCat) {
      try {
        if (store.getState()?.categories.includes(newCat)) throw "category already exists";
        const retCategory = await editRecipe("addCategory", {"category": newCat});
        dispatch(addCategory(retCategory));
        inputRef.current.value = "";
        setShowCreateNew(false);
      } catch (error) {
        console.log(error);
      }  
    }
  }
  return(
    <form className="folderdisplaylist-new">
      <input type="text" className="text" ref={inputRef}/>
      <button className="folderdisplaylist-new-btn" onClick={handleAdd}>add</button>
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