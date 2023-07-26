function Categories({foundCategories, setCurrCategory}){
  const styleCategories = foundCategories?.map((category, i) => {
    return <EachCategory category={category} setCurrCategory={setCurrCategory} key={i} />
  });
  return <ul> {styleCategories} </ul>
}
function EachCategory({category, setCurrCategory}) {
  const handleClick = () => { setCurrCategory(category) }
  return <li className="folderdisplaylist-item" onClick={handleClick}>{category}</li>
}

export default Categories;