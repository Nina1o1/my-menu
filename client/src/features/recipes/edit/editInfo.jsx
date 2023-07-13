import { LabelContainer, 
  ItemLabel, 
  BlockItemLabel, 
  TextContainer, 
  TextInput, 
  ItemSelect,
  BlockItemInput } from "./editComponents";

function EditInfo() {
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

export default EditInfo;