import "./edit.css";

// inputs, id must be consistent with database
function TextInput({id, name, placeholder, specifyPurpose}) {
  const className = extraClasses("edit-text", specifyPurpose);
  return <input id={id} type="text" className={className} name={name} placeholder={placeholder}/>
}

function ItemSelect({id}) {
  return(
    <select id={id} className="edit-text edit-select">
      {/* options */}
    </select>
  )
}

function BlockItemInput({id}){
  return <textarea id={id} className="edit-text edit-text-block"/>
}

// labels
function ItemLabel({label}) {
  return <div className="edit-label" >{label}</div>
}

function BlockItemLabel({label, specifyPurpose}) {
  const className = extraClasses("edit-label-block", specifyPurpose);
  return <div className={className}> {label} </div>
}

// containers
function FormContainer({children}) {
  return(
    <div className="form-container">
      {children}
    </div>
  )
}

function LabelContainer({children}) {
  return(
    <div className="label-container">
      {children}
    </div>
  )
}

function TextContainer({children}) {
  return(
    <div className="text-container">
      {children}
    </div>
  )
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
  ItemLabel,
  BlockItemLabel,
  ItemSelect,
  TextInput,
  BlockItemInput,

  FormContainer,
  LabelContainer,
  TextContainer
}