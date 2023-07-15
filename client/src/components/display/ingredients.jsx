import {  Text, ItemLabel, ItemContainer } from "./displayComponents";

function Ingredients({ingredients}) {

  const styleIngredients = ingredients?.map((ingdt, i) => {
    return <EachIngredient ingredient={ingdt} label={i + 1} key={i}/>
  });
  return (
    <>
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
        <ItemLabel label = {label} specifyClass="multi-label"/>
        <Text content={ingredient["item"]}/>
        <Text content={ingredient["amount"]}/>
      </ItemContainer>
    </>
  )
}

export default Ingredients;