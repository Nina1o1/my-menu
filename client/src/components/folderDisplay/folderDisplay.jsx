import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { selectCategories } from "../../features/categoriesSlice";
import store from "../../app/store";
import "./folderDisplay.css";
import FolderList from "./folderList.jsx";
import FolderShow from "./folderShow.jsx";

function FolderDisplay() {
  const location = useLocation();

  const [foundCategories, setFoundCategories] = useState([]);
  const [currCategory, setCurrCategory] = useState("");
  // load all categories on initial mount
  useEffect(() => {
    console.log("reading me");
    setFoundCategories(selectCategories(store.getState()));
  },[]);
  // read specific category from folder page
  useEffect(() => {
    if (location?.state?.["category"]) {
      setCurrCategory(location?.state?.["category"]);
    }
  }, []);

  return(
    <>
      <div className="folderdisplay-container">
        <FolderList
          foundCategories={foundCategories}
          setFoundCategories={setFoundCategories}
          setCurrCategory={setCurrCategory}
          currCategory={currCategory}/>
        <FolderShow 
          currCategory={currCategory}/>
      </div>
    </>
  )
}

export default FolderDisplay;