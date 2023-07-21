import "./edit.css";
import extraClasses from "../../common/utils/addExtraClasses";

// inputs, id must be consistent with database
function TextInput({id, value, placeholder, specifyClass}) {
  const className = extraClasses("edit-text", specifyClass);
  return <input 
    type="text"
    id={id}
    className={className}
    defaultValue={value}
    placeholder={placeholder}/>
}


function BlockItemInput({id, value}){
  return <textarea 
    id={id} 
    className="edit-text edit-text-block"
    defaultValue={value}/>
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
function Btn({display, specifyClass, handleClick}) {
  const className = extraClasses("edit-btn", specifyClass);
  return <button className={className} onClick={handleClick}>{display}</button>;
}

// special button
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

export {
  ItemLabel,
  BlockItemLabel,
  TextInput,
  BlockItemInput,

  FormContainer,
  LabelContainer,
  TextContainer,
  Btn,
  EditBtn,
}