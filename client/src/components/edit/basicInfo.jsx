import { LabelContainer, 
  ItemLabel, 
  BlockItemLabel, 
  TextContainer, 
  TextInput, 
  ItemSelect,
  BlockItemInput } from "./editComponents";

function BasicInfo({recipe}) {
  return(
    <>
      <LabelContainer>
        <ItemLabel label="Dish Name: "/>
        <ItemLabel label="Serve Size: "/>
        <ItemLabel label="Categories: "/>
        <BlockItemLabel label="Note: "/>
      </LabelContainer>

      <TextContainer>
        <TextInput id="dishname" value={recipe?.["dishname"]}/>
        <TextInput id="serveSize" value={recipe?.["serveSize"]}/>
        <ItemSelect id="categories" value={recipe?.["categories"]}/>
        <BlockItemInput id="note" value={recipe?.["note"]}/>
      </TextContainer>
    </>
  )
}

export default BasicInfo;