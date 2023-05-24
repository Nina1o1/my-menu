import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./error.css";

function Error() {
  let msgArr = ["This Page Does Not Exist", "error-msg"]
  const [msg, setMsg] = useState(msgArr);
  const navigate = useNavigate();
  
  document.body.classList.add("purple-page")

  setTimeout(()=>{
    msgArr = ["Redirecting...", "redirect-msg"]
    setMsg(msgArr)

    setTimeout(() => {
      navigate("/")
    }, 1000);

  }, 2000);

  return(
    <>
      <h1 className={`${msg[1]} msg`}>{msg[0]}</h1>
    </>
  )
}

export default Error;