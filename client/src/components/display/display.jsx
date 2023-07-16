import "./display.css";
import BasicItems from "./basicItems";
import Ingredients from "./ingredients";
import Steps from "./steps";
import { BackBtn, EditBtn } from "./btns";

function Display ({recipe, setdisplayMode}) {
  // TODO: display and edit
  return (
    <div className='display-container'>
      <BackBtn setdisplayMode={setdisplayMode}/>
      <EditBtn recipe={recipe}/>

      <div className="display-content-container">
        <h1 className="display-header">{recipe["dishname"]}</h1>

        <div className="display-detail-container">
          <BasicItems recipe={recipe}/>
          <Ingredients ingredients={recipe["ingredients"]}/>
          <Steps steps={recipe["steps"]}/>
        </div>
      </div>
    </div>
  )
}

export default Display;