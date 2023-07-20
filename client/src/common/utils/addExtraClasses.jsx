// helper function
function extraClasses(defaultClassName, specifyPurpose) {
  if(Array.isArray(specifyPurpose)) {
    return [defaultClassName, ...specifyPurpose].join(" ");  
  }
  else if(specifyPurpose) {
    return [defaultClassName, specifyPurpose].join(" ");
  }
  return defaultClassName;
}

export default extraClasses;