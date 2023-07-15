import "./display.css";
import BasicItems from "./basicItems";
import Ingredients from "./ingredients";
import Steps from "./steps";
import BackBtn from "./backBtn";

function Display ({recipe, setdisplayMode}) {
  
  console.log(recipe);
  // TODO: display and edit
  return (
    <div className='display-container'>
      <BackBtn setdisplayMode={setdisplayMode}/>

      <h1 className="display-header">{recipe["dishname"]}</h1>

      <div className="display-content-container">
        <div className="display-break"/>
        <BasicItems recipe={recipe}/>
        
        <div className="display-break"/>
        <Ingredients ingredients={recipe["ingredients"]}/>
        
        <div className="display-break"/>
        <Steps steps={recipe["steps"]}/>
      </div>
    </div>
  )
}

export default Display;