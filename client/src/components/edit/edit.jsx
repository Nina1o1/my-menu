// import socket from '../socket'
import { useRef } from 'react'
import './edit.css'
import terms from '../../assets/terms.json'

export default function Edit() {
  document.body.classList.remove("purple-page")
  
  // access DOM elements via useRef
  const nameRef = useRef(null);
  const ingredientsRef = useRef(null);
  const descriptionRef = useRef(null);
  const imageRef = useRef(null);
  
  // press button to send data to server
  function sendData(evt) {
    evt.preventDefault();
    const newData = {
      name: nameRef.current.value,
      ingredients: ingredientsRef.current.value,
      description: descriptionRef.current.value,
      image: imageRef.current.value // TODO: deal with image
    }
    console.log(newData);
    // socket.emit("send data", newData)
  }

  return (
    <form>
      <div className="edit-container">
          <div className="input-container">
              <textarea className="addName text" name="addName" placeholder={terms["edit-name"]} ref={nameRef}></textarea>
              <textarea className="addIngredients text" name="addIngredients" placeholder={terms["edit-ingredients"]} ref={ingredientsRef}></textarea>
              <textarea className="addDescription text" name="addDescription" placeholder={terms["edit-description"]} ref={descriptionRef}></textarea>
          </div>
          <div className="displayImg">
              <input type="file" name="addImage" ref={imageRef}/>
          </div>
      </div>
      <button onClick={sendData} type="submit" className="edit-btn">Add</button>
    </form>
  )
}