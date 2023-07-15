import { LabelContainer, 
  ItemLabel, 
  BlockItemLabel, 
  TextContainer, 
  TextInput, 
  ItemSelect,
  BlockItemInput } from "./editComponents";

function BasicInfo() {
  return(
    <>
      <LabelContainer>
        <ItemLabel label="Dish Name: "/>
        <ItemLabel label="Serve Size: "/>
        <ItemLabel label="Categories: "/>
        <BlockItemLabel label="Note: "/>
      </LabelContainer>

      <TextContainer>
        <TextInput id="dishname"/>
        <TextInput id="serveSize"/>
        <ItemSelect id="categories"/>
        <BlockItemInput id="note" />
      </TextContainer>
    </>
  )
}

export default BasicInfo;