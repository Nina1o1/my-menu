import { useRef, useState } from "react";
import { LabelContainer, 
  ItemLabel, 
  BlockItemLabel, 
  TextContainer, 
  TextInput, 
  ItemSelect,
  BlockItemInput,
  SelectBtn,
  PopOut } from "./editComponents";
import { useDispatch } from "react-redux";
import { addCategory } from "../../features/categoriesSlice";
import store from "../../app/store";
import useEditRecipe from "../../common/hooks/useEditRecipe";

function BasicInfo({recipe}) {
  const [showPopup, setShowPopup] = useState(false);
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const editRecipe = useEditRecipe();

  const content = (
    <>
      <div>
        <ItemLabel label="New Category: " specifyClass="popout-label"/>
      </div>
      <div ref={inputRef}>
        <TextInput id="newCategory" specifyClass="popout-text"/>
      </div>
    </>
  )

  function handlePopup (evt) {
    evt.preventDefault();
    if(!showPopup) {
      setShowPopup(true);
    }
  }

  function handleClickRight (evt) {
    evt.preventDefault();
    const inputText = inputRef.current?.firstChild?.value;
    if(!inputText) return;
    try {
      if (store.getState()?.categories?.includes(inputText)) {
        throw "category already exists";
      }
      // editRecipe("addCategory", {category: inputText});
      // dispatch(addCategory(inputText));
      // if(showPopup) setShowPopup(false);
    } catch (error) {
      console.log(error);
    }
  }

  return(
    <>
      <LabelContainer>
        <ItemLabel label="Dish Name: "/>
        <ItemLabel label="Serve Size: "/>
        <ItemLabel label="Categories: "/>
        <BlockItemLabel label="Note: "/>
      </LabelContainer>

      <TextContainer>
        <TextInput id="dishname" value={recipe?.["dishname"]}/>
        <TextInput id="serveSize" value={recipe?.["serveSize"]}/>
        <div className="select-container">
          <ItemSelect id="categories" value={recipe?.["categories"]}/>
          <SelectBtn display="+" handleClick={handlePopup}/>
        </div>
        <BlockItemInput id="note" value={recipe?.["note"]}/>
      </TextContainer>
      <PopOut 
        content = {content}
        leftBtnText = "Back"
        rightBtnText = "Add"
        handleClickRight = {handleClickRight}
        showPopup = {showPopup}
        setShowPopup={setShowPopup}/>
    </>
  )
}

export default BasicInfo;