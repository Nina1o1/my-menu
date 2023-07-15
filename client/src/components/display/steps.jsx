import {  Text, ItemLabel, ItemContainer } from "./displayComponents";

function Steps({steps}){
  const styleSteps = steps.map((step, i) => {
    return <EachStep step={step["description"]} label={i + 1} key={i}/>
  });
  return (
    <>
      <ItemContainer>
        <ItemLabel label = "Steps"/>
      </ItemContainer>
      {styleSteps}
    </>
  )
}

function EachStep({step, label}){
  return (
    <ItemContainer>
      <ItemLabel label={label} specifyClass="multi-label"/>
      <Text content={step}/>
    </ItemContainer>
  )
}

export default Steps;