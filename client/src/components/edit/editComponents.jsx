import "./edit.css";
import "./editComponents.css";

function Step({keyVal, delProps}) {
  return (
    <div className="edit-container" id={`step-${keyVal}`}>
      <textarea type="text" className="edit-text edit-step"/>
      <EditBtn 
        display={"-"}
        btnType={"edit-step-btn"}
        delProps={delProps}
        keyVal={keyVal}
      />
    </div>
  )
}

function StepCount({num}) {
  return (
    <div className="edit-label">{`Step ${num}: `}</div>
  )
}

function Ingredient({keyVal, delProps}) {
  return (
    <div className="ingdt-container" id={`ingredient-${keyVal}`}>
      <input type="text" className="edit-text edit-ingdt"/>
      <input type="text" className="edit-text edit-ingdt-amount" placeholder="Amount"/>
      <EditBtn 
        display={"-"} 
        btnType={"edit-ingdt-btn"}
        delProps={delProps}
        keyVal={keyVal}
      />
    </div>
  )
}

// delete specific item (step / ingredient), specified via "delProps" & "keyVal"
function EditBtn({display, btnType, delProps, keyVal}) {
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
      className={`edit-btn ${btnType}`}
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