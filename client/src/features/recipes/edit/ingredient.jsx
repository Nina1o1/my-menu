import "./edit.css";
import { TextInput } from "./editComponents";
import EditBtn from "./editBtn";

function Ingredient({keyVal, delProps}) {
  const dragMe = keyVal === 1 ? "Drag Me!" : "";
  return (
    <div className="multi-container" id={`ingredient-${keyVal}`}>
      
      <div className="ingdt-container">
        <TextInput placeholder={dragMe} specifyPurpose="ingdt"/>
        <TextInput placeholder="Amount"/>
      </div>

      <EditBtn 
        display={"-"} 
        delProps={delProps}
        keyVal={keyVal}
      />
    </div>
  )
}

export default Ingredient;