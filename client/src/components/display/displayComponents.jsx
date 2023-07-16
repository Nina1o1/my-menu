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
function extraClasses(defaultClassName, specifyPurpose) {
  let className;
  if(specifyPurpose?.length > 1) {
    className = [defaultClassName, ...specifyPurpose].join(" ");  
  }
  className = [defaultClassName, specifyPurpose].join(" ");
  return className;
}

export {
  Text,
  ItemLabel,
  ItemContainer,
  ParagContainer,
  Br
}