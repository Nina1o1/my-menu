import "./popup.css";
function Popup({content, setDisplay, handleClickRight}){

  // use state passed to this function to set display mode
  const handleClickLeft = () => { setDisplay(false) };
  return(
    <div className="popup-container">
      <div className="popup-content">{content}</div>
      <div className="popup-btn-container">
        <button onClick={handleClickLeft}>back</button>
        {handleClickRight
          ? <button onClick={handleClickRight}>confirm</button>
          : ""}

      </div>
    </div>
  )
}

export default Popup;