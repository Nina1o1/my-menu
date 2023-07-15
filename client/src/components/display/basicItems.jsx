import {  Text, ItemLabel, ItemContainer, ParagContainer } from "./displayComponents";
function BasicItems ({recipe}) {
  return (
    <>
      <Item label="Serve Size" content={recipe["serveSize"]}/>
      <Item label="Categories" content={recipe["categories"]}/>
      <Item label="Note" content={recipe["note"]}/>
    </>
  )
}

function Item({label, content}) {
  if (!content?.length) return;
  let item;
  // customize for note
  switch (label) {
    case "Note": {
      item = <ParagContainer longContent = {content}/>;
      break;  
    }
    default: {
      item = <Text content = {content}/>;
    }
  }
  return (
    <ItemContainer>
      <ItemLabel label = {label}/>
      {item}
    </ItemContainer>
  )
}
export default BasicItems;