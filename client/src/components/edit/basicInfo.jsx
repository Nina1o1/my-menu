import {
  ItemContainer,
  ItemLabel, 
  TextInput, 
  BlockItemInput } from "./editComponents";

function BasicInfo({recipe}) {
  return(
    <>
      <Item label="Dish Name" content={recipe?.["serveSize"]}/>    
      <Item label="Serve Size" content={recipe?.["serveSize"]}/>
      <Item label="Categories" content={recipe?.["categories"]}/>
      <Item label="Note" content={recipe?.["note"]}/>
    </>
  )
}

function Item({label, content}) {
  if (!content?.length) content = "";
  let item;
  // customize for note
  switch (label) {
    case "Note": {
      item = <BlockItemInput longContent = {content}/>;
      break;  
    }
    default: {
      item = <TextInput content = {content}/>;
    }
  }
  return (
    <ItemContainer>
      <ItemLabel label = {label}/>
      {item}
    </ItemContainer>
  )
}


export default BasicInfo;