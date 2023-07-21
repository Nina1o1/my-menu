import "./display.css";
import BasicItems from "./basicItems";
import Ingredients from "./ingredients";
import Steps from "./steps";
import { BackBtn, LinkBtn } from "./displayComponents";

function Display ({recipe, setdisplayMode}) {
  return (
    <div className='display-container'>
      <BackBtn setdisplayMode={setdisplayMode}/>
      <LinkBtn 
        linkLoc="edit" linkState={recipe} 
        imgSrc="./edit.png" 
        specifyClass="display-editbtn"/>

      <h1 className="display-header">{recipe["dishname"]}</h1>
      <div className="display-detail-container">
        <BasicItems recipe={recipe}/>
        <Ingredients ingredients={recipe["ingredients"]}/>
        <Steps steps={recipe["steps"]}/>
      </div>
    </div>
  )
}

export default Display;