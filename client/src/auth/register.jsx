import { Link, useNavigate } from 'react-router-dom'
import { useState, useRef } from 'react'

import './access.css'
// import socket from '../socket'
import terms from '../assets/terms.json'
import status from "../assets/status.json"

function Register() {
  document.body.classList.add("purple-page")
  const navigate = useNavigate();

  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const [title, setTitle] = useState("");
  const [parag, setParag] = useState("")  
  
  // submit form to server
  async function handleClick (evt) {
    evt.preventDefault();
    // get user info
    const userInfo = {
      username: usernameRef.current.value,
      password: passwordRef.current.value
    }
    // post form
    const postOptions = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userInfo)
    }
    const serverURL = "http://localhost:3000";
    const postURL = `${serverURL}/register`;
    try {
      await fetch(postURL, postOptions);
    } catch (error) {
      
    }
  }

  // listen from server
  // function handleRegistration(regStatus){
  //   switch (regStatus) {
  //     case status["reg-success"]: {
  //       setTitle(terms["reg-success-t"])
  //       setParag(terms["reg-success-p"])
  //       navigate("/login")
  //       break;
  //     }
  //     case status["reg-exist"]:{
  //       setTitle(terms["reg-exist-t"])
  //       setParag(terms["reg-exist-p"])
  //       break;
  //     }
  //     case status["reg-error"]:{
  //       setTitle(terms["reg-error-t"])
  //       setParag(terms["reg-error-p"])
  //       break;
  //     }
  //     default:{
  //       break;
  //     }
  //   }
  // }
  // socket.on("register status", handleRegistration);

  return(
    <>
      <div className="access-container">
        <div className="access-alerts">
          <h1 className="access-msg-title">{title}</h1>
          <p className="access-msg-p">{parag}</p>
        </div>

        <form>
          <div className="access-row">
            <label className="access-label" htmlFor="username">Username:</label>
            <input className="access-bar text" type="text" name="username" ref={usernameRef} required/>
          </div>
          <div className="access-row">
            <label className="access-label" htmlFor="password">Password:</label>
            <input className="access-bar text" type="text" name="password" ref={passwordRef} required/>
          </div>
          <div className="access-row">
            <button className="access-btn" type="submit" onClick={handleClick}>Register</button>
          </div>
        </form>
        <p className="access-switch">
          Already have an account?
          <Link to="/login"> Login</Link>
        </p>
      </div>
    </>
  )
}

export default Register