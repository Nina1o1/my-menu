import { Link } from "react-router-dom";
import { useRef } from "react";
import "./error.css";
import Kaomojis from "../../utils/readKaomojis";

function Error() {
  document.body.classList.add("purple-page");
  const kmj = useRef("( • ᴖ • ｡)");
  const kmjs = new Kaomojis();
  kmj.current = kmjs.findSad();

  return(
    <>
      <h1 className="msg error-msg">This Page Does Not Exist</h1>
      <Link to="/" className="redirect-msg">
        {"Back to Home Page "}
        <span className="redirect-kmj"> {kmj.current}</span>
      </Link>
    </>
  )
}

export default Error;