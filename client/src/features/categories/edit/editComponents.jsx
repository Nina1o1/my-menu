import "./edit.css";

function ItemLabel({label}) {
  return <div className="edit-label" >{label}</div>
}

function BlockItemLabel({label}) {
  return <div className="edit-label-block">{label}</div>
}

function TextInput({name, placeholder, specifyPurpose}) {
  const className = ["edit-text", specifyPurpose].join(" ");
  return <input type="text" className={className} name={name} placeholder={placeholder}/>
}

function ItemSelect({name}) {
  return(
    <select className="edit-text edit-select" name={name}>
      {/* options */}
    </select>
  )
}

function BlockItemInput({name}){
  return <textarea className="edit-text edit-text-block" name={name}/>
}

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