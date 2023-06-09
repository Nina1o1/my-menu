import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./error.css";

function Error() {
  document.body.classList.add("purple-page")

  return(
    <>
      <h1 className="msg error-msg">This Page Does Not Exist</h1>
      <Link to="/" className="redirect-msg">Back to Home Page</Link>
    </>
  )
}

export default Error;