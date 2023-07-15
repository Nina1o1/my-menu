function styleToggleHelper (displayMode) {

  function innerToggle (currStyle) {
    console.log("toggle: ", currStyle);
    if (displayMode) {
      return currStyle.slice(-5) === "-mode" ? currStyle : currStyle+"-mode";
    }
    return currStyle.slice(-5) === "-mode" ? currStyle.slice(0, currStyle.length - 5) : currStyle;  
  }
  return innerToggle;
  
}
export { styleToggleHelper };