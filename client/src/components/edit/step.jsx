import "./edit.css";
import { BlockItemLabel, BlockItemInput, EditBtn } from "./editComponents";

function Step({keyVal, delProps, stepVal}) {
  const dragMe = keyVal === 1 ? "Hold And Drag!" : "";
  const value = stepVal?.["description"] || ""
  return (
    <div className="multi-container" id={`stepItem-${keyVal}`}>
      <BlockItemInput 
        id={`step-description-${keyVal}`}
        value={value}
        placeholder={dragMe}/>
      <EditBtn 
        display={"-"} 
        delProps={delProps} 
        keyVal={keyVal} />
    </div>
  )
}

function StepCount({num}) {
  return <BlockItemLabel specifyClass={"step-labels"} label={`Step ${num}: `}/>
}

export {Step, StepCount};