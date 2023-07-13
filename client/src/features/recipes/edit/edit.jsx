import "./edit.css";
import { useState, useRef } from "react";
import { Step, StepCount } from "./step";
import Ingredient from "./ingredient";
import EditInfo from "./editInfo";
import FormBtn from "./formBtn";
import { ItemLabel, FormContainer, LabelContainer, TextContainer} from "./editComponents";

function Edit() {
  document.body.classList.remove("purple-page");

  const formRef = useRef(null);
  // array of components
  const [stepComp, setStepComp] = useState([]);
  const [stepCountComp, setStepCountComp] = useState([]);
  const [ingredientComp, setIngredientComp] = useState([]);
  // [0] # displayed item, [1] # total items (including deleted ones, serve as kay & id) 
  const [stepCount, setStepCount] = useState([1, 1]);
  const [IngredientCount, setIngredientCount] = useState([1, 1]);

  // pass props to "edit-btn" to delete specific step & ingredient
  const stepDelProps = [setStepComp, stepCount, setStepCount, setStepCountComp];
  const ingredientDelProps = [setIngredientComp, ingredientComp, setIngredientCount];

  // pass to a button that add iterable objects (step & ingredient)
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

  // TODO: image, image for each step, ingredient portion, drag feature
  return(
    <form ref={formRef}>

      {/* <FormContainer>
        <div className="img-container">
          TODO: image
        </div>
      </FormContainer> */}

      <FormContainer>
        <EditInfo />
      </FormContainer>

      <FormContainer>
        <LabelContainer>
          <ItemLabel label="Ingredients: "/>
        </LabelContainer>

        <TextContainer>
          { ingredientComp }
          <button className="add-btn"
            onClick={evt => 
              handleAddItem(
                evt, 
                <Ingredient key={IngredientCount[1]} keyVal={IngredientCount[1]} delProps={ingredientDelProps} />,
                setIngredientComp, 
                setIngredientCount, 
            )}>
            Add Ingredient
          </button>
        </TextContainer>
      </FormContainer>

      <FormContainer>
        <LabelContainer>
           {stepCount[0] <= 1
             ? <ItemLabel label="Steps: "/>
             : <>{stepCountComp}</>}        
        </LabelContainer>

        <TextContainer>
          { stepComp }
          <button className="add-btn"
            onClick={evt => 
              handleAddItem(
                evt, 
                <Step key={stepCount[1]} keyVal={stepCount[1]} delProps={stepDelProps}/>,
                setStepComp, 
                setStepCount, 
                setStepCountComp, 
                <StepCount key={stepCount[1]} num={stepCount[0]}/>
              )}>
            Add Step
          </button>
        </TextContainer>
      </FormContainer>

      <FormContainer>
        <FormBtn formItems={formRef.current}/>
      </FormContainer>
    </form>
  )
}
export default Edit;