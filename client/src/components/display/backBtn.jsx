
function BackBtn({setdisplayMode}){

  function handleClick(evt) {
    evt.preventDefault();
    setdisplayMode(false);
  }

  return (
    <div className="display-backbtn" onClick={handleClick}>
      {">"}
    </div>
  )
}
export default BackBtn;