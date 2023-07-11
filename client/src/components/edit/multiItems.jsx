function MultiItems() {
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

  return(
    <>
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
    </>
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

return MultiItems;