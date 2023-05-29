import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./error.css";

function Error() {
  // let msgArr = ["This Page Does Not Exist", "error-msg"]
  // const [msg, setMsg] = useState(msgArr);
  // const navigate = useNavigate();
  
  document.body.classList.add("purple-page")

  // setTimeout(()=>{
  //   msgArr = ["Redirecting...", "redirect-msg"]
  //   setMsg(msgArr)

  //   setTimeout(() => {
  //     navigate("/")
  //   }, 1000);

  // }, 1000);

  return(
    <>
      <h1 className="msg error-msg">This Page Does Not Exist</h1>
      <Link to="/" className="redirect-msg">Back to Home Page</Link>
    </>
  )
}

export default Error;