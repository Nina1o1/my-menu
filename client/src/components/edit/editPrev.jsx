// import socket from '../socket'
import { useRef, useState } from 'react'
import './edit.css';
import { EditRow } from './editHelper';
// import xMark from "./x-mark.png";

export default function Edit() {
  document.body.classList.remove("purple-page");
  const [addedStep, setStep] = useState([]);
  const [stepNum, setStepNum] = useState(1);
  const [addedIngredient, setIngredient] = useState([]);
  const [ingredientNum, setIngredientNum] = useState(1);

  function handleAdd (evt, setItem, setItemNum, itemComponent) {
    evt.preventDefault();
    setItemNum(prev => {
      console.log(prev)
      return ++prev;
    });
    setItem(prev => [...prev, itemComponent]);
  }

  return (
    <form>
      <div className='edit-container-rows'>

        <div className="edit-col">
          <EditRow>
            <label className='edit-label'>Dish Name: </label>
            <input className="edit-text" type="text" name="username"/>
          </EditRow>

          <EditRow>
            <label className='edit-label'>Categories: </label>
            <select className="edit-text edit-select" name="categories">
              {/* load options */}
            </select>
          </EditRow>
          
          <EditRow>
            <label className='edit-label'>Serve Size: </label>
            <input className="edit-text" type="text" name="serveSize"/>
          </EditRow>

          <EditRow>
            <label className='edit-label'>Note: </label>
            <textarea className="edit-text edit-note" name="note"/>
          </EditRow>
        </div>

        <div className='edit-img-row'>
          <div className='edit-img'>
          {/* load image */}
          </div>

          {/* load image note */}
          <input className='edit-img-note' type="text" name="imageNote" placeholder='Image Description'/>
        </div>
      </div> 

      <div className='edit-container-rows'>
        <div className='edit-col'>
          
          {/* <EditRow>
            <div className='edit-label'>Step: </div>
            <textarea className="edit-text"/>
          </EditRow> */}
          
          {addedStep}
          
          <EditRow className="add-step">
            <div className='edit-label'></div>
            <button 
              className="edit-add-btn" 
              onClick={(evt) => 
                handleAdd(evt, setStep, setStepNum, 
                <Step key={stepNum} num={stepNum}/>)}>
              Add Step
            </button>
          </EditRow>
        </div>

        <EditRow>
          <div className='edit-label'>Ingredients: </div>
          <div className='edit-col edit-allIngredients'>
            <input className="edit-text edit-ingt"/>

            {addedIngredient}

            <button 
              className="edit-add-btn add-ingredient" 
              onClick={(evt) => 
                handleAdd(evt, setIngredient, setIngredientNum, 
                <Ingredient key={ingredientNum} num={ingredientNum} />)}>
              Add Ingredient
            </button>
          </div>
        </EditRow>
      </div>

      <div className="edit-btn-container">
        <button className="edit-delete-btn">Delete</button>
        <button className="edit-submit-btn">Submit</button>
      </div>

    </form>
  )
}

function Step({num}) {
  return (
    <EditRow>
      <div className='edit-label'>{`Step ${num}: `}</div>
      <textarea className="edit-text"/>
      <ItemBtn img="-"/>
   </EditRow>
  )
}

function Ingredient({num}) {
  return (
    <>
      <input className="edit-text edit-ingt"/>
      <ItemBtn img="-"/>
    </>
  )
}

function ItemBtn({img}) {
  return<a className='item-btn'>{img}</a>
}