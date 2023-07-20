import extraClasses from "../../common/utils/addExtraClasses";

// contents
function Text({specifyClass, content}) {
  const className = extraClasses("display-text", specifyClass);
  return <div className={className}>{content}</div>
}

// labels
function ItemLabel({label, specifyClass}) {
  const className = extraClasses("display-label", specifyClass);
  return <div className={className} >{label}</div>
}

// containers
function ItemContainer({children}) {
  return <div className="item-container">{children}</div>
}

function ParagContainer({longContent}) {
  const stepLine = longContent.split("\n");
  // console.log(stepLine);
  const textLine = stepLine.map((line, i) => {
    return <Text content={line} key={i}/>
  });
  return (
    <div className="parag-container">
      {textLine}
    </div>
  )
}

// style
function Br() {
  return <div className="display-break"/>
}

// special buttons
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

export {
  Text,
  ItemLabel,
  ItemContainer,
  ParagContainer,
  Br,
  EditBtn,
  BackBtn
}