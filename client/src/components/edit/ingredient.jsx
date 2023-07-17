import "./edit.css";
import { TextInput } from "./editComponents";
import EditBtn from "./editBtn";

function Ingredient({keyVal, delProps, indgtVal}) {
  const itemValue = indgtVal?.["item"] || "";
  const amountValue = indgtVal?.["amount"] || "";
  return (
    <div className="multi-container" id={`ingdtItem-${keyVal}`}>
      
      <div className="ingdt-container">
        <TextInput 
          id={`ingredient-item-${keyVal}`} 
          value={itemValue}
          specifyClass="ingdt" />
        <TextInput 
          id={`ingredient-amount-${keyVal}`} 
          value={amountValue}
          placeholder="Amount" />
      </div>

      <EditBtn display={"-"} delProps={delProps} keyVal={keyVal}/>
    </div>
  )
}

export default Ingredient;