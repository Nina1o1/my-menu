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
        <TextInput name="dishname"/>
        <TextInput name="serveSize"/>
        <ItemSelect name="categories"/>
        <BlockItemInput />
      </TextContainer>
    </>
  )
}

export default EditInfo;