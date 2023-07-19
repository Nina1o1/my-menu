import {  Text, ItemLabel, ItemContainer, Br } from "./displayComponents";

function Ingredients({ingredients}) {
  if(!ingredients?.length) return;
  const styleIngredients = ingredients?.map((ingdt, i) => {
    return <EachIngredient ingredient={ingdt} label={i + 1} key={i}/>
  });
  return (
    <>
      <Br />
      <ItemContainer>
        <ItemLabel label = "Ingredients"/>
      </ItemContainer>
      {styleIngredients}
    </>
  );
}
  
function EachIngredient({ingredient, label}) {
  return (
    <>
      <ItemContainer>
        <ItemLabel label = {label} specifyClass="label-count"/>
        <Text content={`${ingredient["item"]} ······ ${ingredient["amount"]}`}/>
      </ItemContainer>
    </>
  )
}

export default Ingredients;