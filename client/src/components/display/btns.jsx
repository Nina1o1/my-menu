function EditBtn({recipe}) {
  // handleClick
  
  return <img 
    className="display-btn display-editbtn" 
    src="./edit.png" alt="e"/>
}

function BackBtn({setdisplayMode}){

  function handleClick(evt) {
    evt.preventDefault();
    setdisplayMode(false);
  }

  return (
    <div className="display-btn display-backbtn" onClick={handleClick}>
      {">"}
    </div>
  )
}
export { BackBtn, EditBtn };