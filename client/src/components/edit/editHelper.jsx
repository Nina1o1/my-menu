import Ingredient from "./ingredient";
import { Step, StepCount } from "./step";

function loadSteps(steps, setStepComp, setStepCount, setStepCountComp, stepDelProps) {
  if(!steps) return;
  const stepComps = [];
  const stepCounts = [];
  steps.forEach((ele, i) => {
    stepComps.push(<Step key={i+1} keyVal={i+1} delProps={stepDelProps} stepVal={ele}/>)
    stepCounts.push(<StepCount key={i+1} num={i+1}/>)
  });
  setStepComp(stepComps);
  setStepCountComp(stepCounts);
  setStepCount(prev => prev.map(ele => ele + steps.length));
}

function loadIngredients(ingdts, setIngredientComp, setIngredientCount, ingredientDelProps) {
  if(!ingdts) return;
  const ingdtComps = ingdts.map((ele, i) => {
    return <Ingredient key={i+1} keyVal={i+1} delProps={ingredientDelProps} indgtVal={ele}/>
  });
  setIngredientComp(ingdtComps);
  setIngredientCount(prev => prev.map(ele => ele + ingdts.length));
}

// pass to a button that add iterable objects (step & ingredient)
function handleAddItem (evt, ItemComponent, setItemComp, setItemCount, ...extraProps) {
  if(evt) evt.preventDefault();

  // increase count & add component for step & ingredient
  setItemCount(prev => prev.map(ele => ++ele));
  setItemComp(prev => [...prev, ItemComponent]);
  
  // extraProps read step count component, defined as "stepCountComp" state
  if (extraProps?.length === 0) return;
  const [setExtraItem, extraComp] = [...extraProps];
  setExtraItem(prev => [...prev, extraComp]);
}

function readFormData(formItems, formdata) {
  if(!formItems) throw "no data";
  Array.from(formItems).forEach(ele => {
    if(!ele.id) return;
    const idtype = ele.id.split("-");
    switch (idtype[0]) {

      case "step": {
        if (!formdata?.["steps"]) formdata["steps"] = [];
        if (!ele.value) return;
        formdata["steps"].push({description: ele.value});
        break;
      }

      case "ingredient": {
        if (!formdata?.["ingredients"]) formdata["ingredients"] = [];
        if (!ele.value) return;
        const ingdtData = formdata["ingredients"];
        if (idtype[1] === "item") {
          ingdtData.push({item: ele.value});
        } 
        else if (idtype[1] === "amount") {
          ingdtData[ingdtData.length-1]["amount"] = ele.value;
        }
        break;
      }

      case "categories": {
        formdata["categories"] = [];
        break;
      }

      case "dishname": {
        if(!ele.value) throw "no dishname";
      }

      default: {
        formdata[ele.id] = ele.value;
      }
    }
  });
  return formdata;
}

export {loadIngredients, loadSteps, handleAddItem, readFormData};