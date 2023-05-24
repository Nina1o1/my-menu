import socket from '../socket'
import { useRef } from 'react'
import './edit.css'

export default function Edit() {
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
    console.log(newData)
    socket.emit("send data", newData)
  }

  return (
    <form>
      <div className="edit-container">
          <div className="input-container">
              <textarea className="addName text" name="addName" placeholder="Dish Name" ref={nameRef}></textarea>
              <textarea className="addIngredients text" name="addIngredients" placeholder="Add ingredients" ref={ingredientsRef}></textarea>
              <textarea className="addDescription text" name="addDescription" placeholder="Describe your meal!" ref={descriptionRef}></textarea>
          </div>
          <div className="displayImg">
              <input type="file" name="addImage" ref={imageRef}/>
          </div>
      </div>
      <button onClick={sendData} type="submit" className="edit-btn">Add</button>
    </form>
  )
}