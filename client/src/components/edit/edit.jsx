import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./edit.css";
import { Step, StepCount } from "./step";
import Ingredient from "./ingredient";
import BasicInfo from "./basicInfo";
import FormBtn from "./formBtn";
import { ItemLabel, FormContainer, LabelContainer, TextContainer} from "./editComponents";
import { loadIngredients, loadSteps, handleAddItem } from "./editHelper";

function Edit() {
  document.body.classList.remove("purple-page");

  const formRef = useRef(null);
  const [initializeForm, setInitializeForm] = useState(false);
  // read recipe passed from dictionary
  const location = useLocation({});
  // array of components (step & ingredients)
  const [stepComp, setStepComp] = useState([]);
  const [stepCountComp, setStepCountComp] = useState([]);
  const [ingredientComp, setIngredientComp] = useState([]);
  // [0] # displayed item, [1] # total items (including deleted ones, serve as kay & id) 
  const [stepCount, setStepCount] = useState([1, 1]);
  const [IngredientCount, setIngredientCount] = useState([1, 1]);

  // pass props to "edit-btn" to delete specific step & ingredient
  const stepDelProps = [setStepComp, stepCount, setStepCount, setStepCountComp];
  const ingredientDelProps = [setIngredientComp, ingredientComp, setIngredientCount];

  let readRecipe;
  // read recipe on initial render
  useEffect(() => {
    if (location?.state) {
      readRecipe = location?.state;
      if(readRecipe["ingredients"]) {
        loadIngredients(readRecipe["ingredients"], setIngredientComp, setIngredientCount, ingredientDelProps);
      }
      if(readRecipe["steps"]){
        loadSteps(readRecipe["steps"], setStepComp, setStepCount, setStepCountComp, stepDelProps);
      }
    }
  }, []);

  function handleClickForm(evt) {
    evt.preventDefault();
    if(!initializeForm) setInitializeForm(true);
  }

  // TODO: image, image for each step, ingredient portion, drag feature
  return(
    <form ref={formRef} onClick={handleClickForm}>
      <FormContainer>
        <BasicInfo recipe = {readRecipe || {}} />
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
        <FormBtn formItems={formRef.current} recipeId={readRecipe?.["_id"]}/>
      </FormContainer>
    </form>
  )
}
export default Edit;