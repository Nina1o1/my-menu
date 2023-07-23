import "./folder.css";
import SearchBar from "./searchBar.jsx";
import FolderList from "./folderList";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { selectCategories } from "../../features/categoriesSlice";
import store from "../../app/store";

function Folder() {
  document.body.classList.remove("purple-page");
  
  const dispatch = useDispatch();
  // const [searchCount, setSearchCount] = useState(0);
  const [foundCategories, setFoundCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  // load categories on initial mount
  useEffect(() => {
    setFoundCategories(selectCategories(store.getState()));
  },[]);
  return(
    <>
      <div className="folder-container">
        {/* <SearchBar 
          setSearchCount={setSearchCount}/> */}
        <FolderList
          foundCategories={foundCategories}
          setActiveCategory={setActiveCategory}/>
      </div>
    </>
  )
}

export default Folder;