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
}