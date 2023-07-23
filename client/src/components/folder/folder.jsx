import "./folder.css";
import FolderList from "./folderList";
import { useEffect, useState } from "react";
import { selectCategories } from "../../features/categoriesSlice";
import store from "../../app/store";

function Folder() {
  document.body.classList.remove("purple-page");
  
  const [foundCategories, setFoundCategories] = useState([]);
  // load categories on initial mount
  useEffect(() => {
    setFoundCategories(selectCategories(store.getState()));
  },[]);
  return(
    <>
      <div className="folder-container">
        <FolderList foundCategories={foundCategories}/>
      </div>
    </>
  )
}

export default Folder;