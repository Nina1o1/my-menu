import "./edit.css";
import extraClasses from "../../common/utils/addExtraClasses";
import { useEffect, useState } from "react";

// inputs, id must be consistent with database
function TextInput({id, value, placeholder, customRef, specifyClass}) {
  const className = extraClasses("edit-text", specifyClass);
  return <input 
    type="text"
    id={id}
    className={className}
    defaultValue={value}
    placeholder={placeholder}
    ref={customRef}/>
}


function BlockItemInput({id, value}){
  return <textarea 
    id={id} 
    className="edit-text edit-text-block"
    defaultValue={value}/>
}

function ItemSelect({id}) {
  return(
    <select id={id} className="edit-text edit-select">
      <option value="">test</option>
      <option value="">try</option>
    </select>
  )
}

// labels
function ItemLabel({label, specifyClass}) {
  const className = extraClasses("edit-label", specifyClass);
  return <div className={className} >{label}</div>;
}

function BlockItemLabel({label, specifyClass}) {
  const className = extraClasses("edit-label-block", specifyClass);
  return <div className={className}> {label} </div>;
}

// containers
function FormContainer({children}) {
  return(
    <div className="form-container">
      {children}
    </div>
  )
}

function LabelContainer({children}) {
  return(
    <div className="label-container">
      {children}
    </div>
  )
}

function TextContainer({children}) {
  return(
    <div className="text-container">
      {children}
    </div>
  )
}

// button
function SelectBtn({display, specifyClass, handleClick}) {
  const className = extraClasses("edit-btn", specifyClass);
  return <button className="edit-btn" onClick={handleClick}>{display}</button>;
}

// special buttons
// delete item (step / ingredient), specified via "delProps" & "keyVal"
function EditBtn({display, delProps, keyVal}) {

  function handleDelBtn (evt, delProps) {
    evt.preventDefault();
    const [setItemComp, itemCount, setItemCount, setExtraItem] = [...delProps];
    
    if(itemCount[0] < 1) return;
    setItemCount(prev => [--prev[0], prev[1]]);
    setItemComp(prev => prev.filter(ele => !(ele.key == keyVal)));
    if(!setExtraItem) return;
    // set step count component
    setExtraItem(prev => {
      prev.pop()
      return prev;
    });
  }

  return (
    <button className="edit-btn" onClick={evt => handleDelBtn(evt, delProps)}>
      {display}
    </button>
  )
}

// popout
function PopOut({content="", leftBtnText="", rightBtnText="", handleClickRight, showPopup, setShowPopup}) {

  const [popoutContainer, setPopoutContainer] = useState("popout-container");

  function handleClickLeft (evt) {
    evt.preventDefault();
    if(showPopup) {
      setShowPopup(false);
    }
  }

  useEffect(() => {
    const currContainer = popoutContainer.split(" ");
    if (currContainer?.[1] === "hidePopout") {
      setPopoutContainer(currContainer[0]);
    } else {
      currContainer.push("hidePopout")
      setPopoutContainer(currContainer.join(" "));
    }
  }, [showPopup]);

  return(
    <div className={popoutContainer}>
      <div className="popout-content">
        {content}
      </div>

      <div className="popout-btn-container">
        <button className="popout-btn popout-left" onClick={handleClickLeft}>{leftBtnText}</button>
        <button className="popout-btn" onClick={handleClickRight}>{rightBtnText}</button>
      </div>
    </div>
  )
}


export {
  ItemLabel,
  BlockItemLabel,
  ItemSelect,
  TextInput,
  BlockItemInput,

  FormContainer,
  LabelContainer,
  TextContainer,
  SelectBtn,
  EditBtn,
  PopOut
}