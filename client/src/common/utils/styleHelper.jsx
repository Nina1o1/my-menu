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

function toggleStyle (word) {
  const endWord = `-${word}`;
  const wordLength = word.length;
  function innerToggle(currStyle) {
    return currStyle.slice(-wordLength) === word ? currStyle.slice(0, currStyle.length - wordLength - 1) : currStyle+endWord;
  }
  return innerToggle;
}

export { extraClasses, toggleStyle };