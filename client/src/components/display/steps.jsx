import {  ItemLabel, ItemContainer, ParagContainer, Br } from "./displayComponents";

function Steps({steps}){
  if (!steps?.length) return;
  const styleSteps = steps.map((step, i) => {
    return <EachStep step={step["description"]} label={i + 1} key={i}/>
  });
  
  return (
    <>
      <Br/>
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
      <ItemLabel label={label} specifyClass="label-count"/>
      <ParagContainer longContent={step}/>
    </ItemContainer>
  )
}

export default Steps;