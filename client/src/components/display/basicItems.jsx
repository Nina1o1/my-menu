import {  Text, ItemLabel, ItemContainer } from "./displayComponents";
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
  return (
    <ItemContainer>
      <ItemLabel label = {label}/>
      <Text content = {content}/>
    </ItemContainer>
  )
}
export default BasicItems;