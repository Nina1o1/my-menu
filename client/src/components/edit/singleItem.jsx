import "./edit.css";
import { EditRow } from "./editHelper";
function SingleItem() {
  return (
    <>
      <div className='edit-container-rows'>
        <div className="edit-col">
          <EditRow>
            <label className='edit-label'>Dish Name: </label>
            <input className="edit-text" type="text" name="username"/>
          </EditRow>

          <EditRow>
            <label className='edit-label'>Categories: </label>
            <select className="edit-text edit-select" name="categories">
              {/* load options */}
            </select>
          </EditRow>
          
          <EditRow>
            <label className='edit-label'>Serve Size: </label>
            <input className="edit-text" type="text" name="serveSize"/>
          </EditRow>

          <EditRow>
            <label className='edit-label'>Note: </label>
            <textarea className="edit-text edit-note" name="note"/>
          </EditRow>
        </div>

        <div className='edit-img-row'>
          <div className='edit-img'>
          {/* load image */}
          </div>

          {/* load image note */}
          <input className='edit-img-note' type="text" name="imageNote" placeholder='Image Description'/>
        </div>
      </div> 
    </>
  )
}

export default SingleItem;