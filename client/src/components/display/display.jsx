import "./display.css";
import BasicItems from "./basicItems";
import Ingredients from "./ingredients";
import Steps from "./steps";
import { LinkBtn, FuncBtn } from "./displayComponents";

function Display ({recipe, setdisplayMode}) {
    function handleClickBack(evt) {
      evt.preventDefault();
      setdisplayMode(false);
    }

  return (
    <div className='display-container'>
      <FuncBtn
        handleClick = {handleClickBack}
        imgSrc="/back.png" 
        specifyClass="display-backbtn"/>
      <LinkBtn 
        linkLoc="edit" linkState={recipe} 
        imgSrc="/edit.png" 
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