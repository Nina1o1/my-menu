import "./edit.css";
import { TextInput } from "./editComponents";
import EditBtn from "./editBtn";

function Ingredient({keyVal, delProps}) {
  // const dragMe = keyVal === 1 ? "Drag Me!" : "";
  return (
    <div className="multi-container" id={`ingdtItem-${keyVal}`}>
      
      <div className="ingdt-container">

        <TextInput id={`ingredient-item-${keyVal}`} specifyClass="ingdt"/>
        <TextInput id={`ingredient-amount-${keyVal}`} placeholder="Amount"/>
      </div>

      <EditBtn display={"-"} delProps={delProps} keyVal={keyVal}/>
    </div>
  )
}

export default Ingredient;