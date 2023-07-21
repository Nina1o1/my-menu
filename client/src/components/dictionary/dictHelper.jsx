function modeToggleHelper (displayMode) {

  function innerToggle (currStyle) {
    if (displayMode) {
      return currStyle.slice(-5) === "-mode" ? currStyle : currStyle+"-mode";
    }
    return currStyle.slice(-5) === "-mode" ? currStyle.slice(0, currStyle.length - 5) : currStyle;  
  }
  return innerToggle;

}

function styleToggleHelper (word) {
  const endWord = `-${word}`;
  const wordLength = word.length;
  function innerToggle(currStyle) {
    return currStyle.slice(-wordLength) === word ? currStyle.slice(0, currStyle.length - wordLength - 1) : currStyle+endWord;
  }
  return innerToggle;
}
export { modeToggleHelper, styleToggleHelper };