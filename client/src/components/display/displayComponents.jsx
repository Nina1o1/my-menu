import { extraClasses } from "../../common/utils/styleHelper";
import { Link } from "react-router-dom";

// contents
function Text({content, specifyClass}) {
  const className = extraClasses("display-text", specifyClass);
  if(Array.isArray(content)) {
    content = content.map(ele => <span>{ele}</span>);
  }
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

// link btn
function LinkBtn({linkLoc, linkState, imgSrc, specifyClass}) {
  const className = extraClasses("display-btn", specifyClass);
  return (
    <Link to={linkLoc} state={linkState}>
      <img 
        className={className}
        src={imgSrc}/>
    </Link>
  )

}

function FuncBtn({handleClick, imgSrc, specifyClass}){
  const className = extraClasses("display-btn", specifyClass);
  return (
    <img 
      onClick={handleClick}
      className={className}
      src={imgSrc}/>
  )
}
export {
  Text,
  ItemLabel,
  ItemContainer,
  ParagContainer,
  Br,
  LinkBtn,
  FuncBtn
}