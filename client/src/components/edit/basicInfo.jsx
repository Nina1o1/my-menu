import { LabelContainer, 
  ItemLabel, 
  BlockItemLabel, 
  TextContainer, 
  TextInput, 
  BlockItemInput } from "./editComponents";

function BasicInfo({recipe}) {

  return(
    <>
      <LabelContainer>
        <ItemLabel label="Dish Name: "/>
        <ItemLabel label="Serve Size: "/>
        <BlockItemLabel label="Note: "/>
      </LabelContainer>

      <TextContainer>
        <TextInput id="dishname" value={recipe?.["dishname"]}/>
        <TextInput id="serveSize" value={recipe?.["serveSize"]}/>
        <BlockItemInput id="note" value={recipe?.["note"]}/>
      </TextContainer>
    </>
  )
}

export default BasicInfo;