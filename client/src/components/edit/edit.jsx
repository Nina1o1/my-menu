import "./edit.css";
import { useState } from "react";
import { Step, StepCount, Ingredient} from "./editComponents";

function Edit() {
  document.body.classList.remove("purple-page");

  // step component & step count component
  const [stepComp, setStepComp] = useState([]);
  const [stepCountComp, setStepCountComp] = useState([]);
  // ingredient component
  const [ingredientComp, setIngredientComp] = useState([]);
  // [0] # displayed step, [1] # total steps (including deleted ones, serve as kay & id) 
  const [stepCount, setStepCount] = useState([1, 1]);
  const [IngredientCount, setIngredientCount] = useState([1, 1]);

  // pass props to "edit-btn" to delete specific step & ingredient
  const stepDelProps = [setStepComp, stepCount, setStepCount, setStepCountComp];
  const ingredientDelProps = [setIngredientComp, ingredientComp, setIngredientCount];

  function handleAddItem (evt, ItemComponent, setItemComp, setItemCount, ...extraProps) {
    evt.preventDefault();

    // increase count & add component for step & ingredient
    setItemCount(prev => prev.map(ele => ++ele));
    setItemComp(prev => [...prev, ItemComponent]);
    
    // extraProps read step count component, defined as "stepCountComp" state
    if (extraProps?.length === 0) return;
    const [setExtraItem, extraComp] = [...extraProps];
    setExtraItem(prev => [...prev, extraComp]);
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
            <select className="edit-text edit-select" name="categories">
              {/* options */}
            </select>
            <textarea className="edit-text edit-note" name="note"/>
          </div>

        </div>

        <div className="side-container image-container">

          <div className="edit-img">
            <img className="load-img" src="" alt="dish image" />
          </div>
          <input type="text" className="edit-imgText" placeholder="Image Side Note"/>
        
        </div>
      </div>

      <div className="form-container">
        <div className="side-container">

          <div className="label-container">
            {stepCount[0] <= 1
              ? <div className="edit-label">Steps: </div>
              : <>{stepCountComp}</>}
          </div>

          <div className="text-container">
            { stepComp }
            <button className="add-btn add-step-btn"
              onClick={evt => 
                handleAddItem(
                  evt, 
                  <Step 
                    key={stepCount[1]}
                    keyVal={stepCount[1]} 
                    delProps={stepDelProps}
                  />,
                  setStepComp, 
                  setStepCount, 
                  setStepCountComp, 
                  <StepCount 
                    key={stepCount[1]} 
                    num={stepCount[0]}
                  />
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
                handleAddItem(
                  evt, 
                  <Ingredient 
                    key={IngredientCount[1]}
                    keyVal={IngredientCount[1]}
                    delProps={ingredientDelProps}
                  />,
                  setIngredientComp, 
                  setIngredientCount, 
              )}>
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

export default Edit;