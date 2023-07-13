import "./edit.css";

// delete item (step / ingredient), specified via "delProps" & "keyVal"
function EditBtn({display, delProps, keyVal}) {

  function handleDelBtn (evt, delProps) {
    evt.preventDefault();
    const [setItemComp, itemCount, setItemCount, setExtraItem] = [...delProps];
    
    if(itemCount[0] < 1) return;
    setItemCount(prev => [--prev[0], prev[1]]);
    setItemComp(prev => prev.filter(ele => !(ele.key == keyVal)));
    if(!setExtraItem) return;
    // set step count component
    setExtraItem(prev => {
      prev.pop()
      return prev;
    });
  }

  return (
    <button className={`edit-btn`} onClick={evt => handleDelBtn(evt, delProps)}>
      {display}
    </button>
  )
}

export default EditBtn;