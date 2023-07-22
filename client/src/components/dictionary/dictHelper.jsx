function modeToggleHelper (displayMode) {

  function innerToggle (currStyle) {
    if (displayMode) {
      return currStyle.slice(-5) === "-mode" ? currStyle : currStyle+"-mode";
    }
    return currStyle.slice(-5) === "-mode" ? currStyle.slice(0, currStyle.length - 5) : currStyle;  
  }
  return innerToggle;

}

export { modeToggleHelper };