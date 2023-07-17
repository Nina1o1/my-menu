import { Link } from "react-router-dom";
function EditBtn({recipe}) {
  return (
    <Link to="edit" state={recipe}>
      <img 
        className="display-btn display-editbtn" 
        src="./edit.png" alt="e"/>
    </Link>
  )
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