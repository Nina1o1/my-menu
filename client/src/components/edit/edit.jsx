import "./edit.css";
import { useState } from "react";

function Edit() {
  document.body.classList.remove("purple-page");

  const [stepComp, setStepComp] = useState([]);
  const [stepCountComp, setStepCountComp] = useState([]);
  const [stepCount, setStepCount] = useState(1);
  const [ingredientComp, setIngredientComp] = useState([]);
  const [IngredientCount, setIngredientCount] = useState(1);

  function handleAddItem (evt, setItem, setItemCount, ItemComponent, ...extraParams) {
    evt.preventDefault();

    setItemCount(prev => ++prev);
    setItem(prev => [...prev, ItemComponent]);

    if (extraParams?.length === 0) return;
    
    const [setExtraItem, extraComp] = [...extraParams];
    setExtraItem(prev => [...prev, extraComp]);
  }

  function handleEditBtn (evt, itemCount, setItemCount, setExtraItem) {
    evt.preventDefault();
    
    if(itemCount === 1) return;
    setItemCount(prev => --prev);
    
    if(!setExtraItem) return;
    setExtraItem(prev => {
      prev.pop()
      return prev;
    });
  }

  return(
    <form>
      <div className="form-container">
        <div className="side-container">

          <div className="label-container">
            <div className="edit-label">Dish Name: </div>
            <div className="edit-label">Serve Size: </div>
            <div className="edit-label">Categories: </div>
            <div className="edit-label">Note: </div>
          </div>

          <div className="text-container">
            <input type="text" className="edit-text" name="dishname" placeholder="Press Tab To Proceed ->"/>
            <input type="text" className="edit-text" name="serveSize"/>
            <input type="text" className="edit-text" name="categories"/>
            <textarea className="edit-text edit-note" name="note"/>
          </div>
        </div>

        <div className="side-container image-container">
          <div className="edit-img">
            <img className="" src="" alt="dish image" />
          </div>
          <input type="text" className="edit-imgText" placeholder="Image Side Note"/>
        </div>
      </div>

      <div className="form-container">
        <div className="side-container">
          <div className="label-container">
            {stepCount === 1 
              ? <div className="edit-label">Steps: </div>
              : <>{stepCountComp}</>}
          </div>

          <div className="text-container">
            { stepComp }

            <button className="add-btn add-step-btn"
              onClick={evt => 
                handleAddItem(evt, setStepComp, setStepCount, <Step key={stepCount}/>,
                setStepCountComp, <StepCount key={stepCount} num={stepCount}/>
              )}>
              Add Step
            </button>
          </div>

        </div>

        <div className="side-container">
          <div className="label-container">
            <div className="edit-label">Ingredients: </div>
          </div>
          
          <div className="text-container">
            {ingredientComp}
            <button className="add-btn"
              onClick={evt => 
                handleAddItem(evt, setIngredientComp, setIngredientCount, <Ingredient key={IngredientCount}/>)}>
              Add Ingredient
            </button>
          </div>

        </div>
      </div>

      <div className="btn-container">
        <button className="btn-delete">Delete</button>
        <button className="btn-submit">Submit</button>
      </div>
    </form>
  )
}

function Step() {
  return (
    <div className="edit-container">
      <textarea type="text" className="edit-text edit-step"/>
      <EditBtn 
        display={"-"}
        btnType={"edit-step-btn"}
      />
    </div>
  )
}

function StepCount({num}) {
  return (
    <div className="edit-label">{`Step ${num}: `}</div>
  )
}

function Ingredient() {
  return (
    <div className="ingdt-container">
      <input type="text" className="edit-text edit-ingdt"/>
      <input type="text" className="edit-text edit-ingdt-amount" placeholder="Amount"/>
      <EditBtn 
        display={"-"} 
        btnType={"edit-step-ingdt"}
      />
    </div>
  )
}

function EditBtn({display, btnType}) {
  return (
    <button
      className={`edit-btn ${btnType}`}>
      {display}
    </button>
  )
}
export default Edit;