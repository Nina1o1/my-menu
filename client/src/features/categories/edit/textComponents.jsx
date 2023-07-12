import "./edit.css";
import { BlockItemLabel, TextInput, BlockItemInput } from "./editComponents";

function Step({keyVal, delProps}) {
  const dragMe = keyVal === 1 ? "Hold And Drag!" : "";
  return (
    <div className="multi-container" id={`step-${keyVal}`}>
      <BlockItemInput placeholder={dragMe}/>
      <EditBtn 
        display={"-"}
        delProps={delProps}
        keyVal={keyVal}
      />
    </div>
  )
}

function StepCount({num}) {
  return <BlockItemLabel label={`Step ${num}: `}/>
}

function Ingredient({keyVal, delProps}) {
  const dragMe = keyVal === 1 ? "Drag Me!" : "";
  return (
    <div className="multi-container" id={`ingredient-${keyVal}`}>
      <div className="ingdt-container">
        <TextInput placeholder={dragMe} specifyPurpose="ingdt"/>
        <TextInput placeholder="Amount"/>
      </div>
      {/* <input type="text" className="edit-text edit-ingdt-amount" placeholder="Amount"/> */}
      <EditBtn 
        display={"-"} 
        delProps={delProps}
        keyVal={keyVal}
      />
    </div>
  )
}

// delete specific item (step / ingredient), specified via "delProps" & "keyVal"
function EditBtn({display, delProps, keyVal}) {
  function handleDelBtn (evt, delProps) {
    evt.preventDefault();
    const [setItemComp, itemCount, setItemCount, setExtraItem] = [...delProps];
    
    if(itemCount[0] < 1) return;
    setItemCount(prev => [--prev[0], prev[1]]);
    setItemComp(prev => prev.filter(ele => !(ele.key == keyVal)));
    if(!setExtraItem) return;
    setExtraItem(prev => {
      prev.pop()
      return prev;
    });
  }

  return (
    <button
      className={`edit-btn`}
      onClick={evt => handleDelBtn(evt, delProps)}>
      {display}
    </button>
  )
}

export {
  Step,
  StepCount,
  Ingredient
}