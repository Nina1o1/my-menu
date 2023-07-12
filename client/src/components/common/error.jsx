import { Link } from "react-router-dom";
import { useRef } from "react";
import "./error.css";
import Kaomojis from "../../common/utils/readKaomojis";

import { useDispatch, useSelector } from "react-redux";
import { addCategory, deleteCategory, updateCategory, readCategories } from "../../features/categories/categoriesSlice";
function Error() {
  const dispatch = useDispatch();

  // dispatch(addCategory("test"));
  // dispatch(addCategory("john"));
  // dispatch(addCategory("sleep"));
  // console.log(useSelector(readCategories));

  // dispatch(updateCategory({target:"john", input:"nina"}));
  // dispatch(deleteCategory("sleep"));
  // console.log(useSelector(readCategories));


  document.body.classList.add("purple-page");
  const kmj = useRef("( • ᴖ • ｡)");
  const kmjs = new Kaomojis();
  kmj.current = kmjs.findSad();

  return(
    <>
      <h1 className="error-msg">This Page Does Not Exist</h1>
      <Link to="/" className="redirect-msg">
        {"Back to Home Page "}
        <span className="redirect-kmj"> {kmj.current}</span>
      </Link>
    </>
  )

}
export default Error;