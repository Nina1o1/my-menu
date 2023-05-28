import { Link, useNavigate } from 'react-router-dom'
import { useState, useRef } from 'react'

import './access.css'
import terms from '../assets/terms.json'
import status from "../assets/status.json"
import socket from '../socket'

function Register() {
  document.body.classList.add("purple-page")
  const navigate = useNavigate();

  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const [title, setTitle] = useState("");
  const [parag, setParag] = useState("")

  // form submission
  function handleClick (evt) {
    evt.preventDefault();
    const userInfo = {
      username: usernameRef.current.value,
      password: passwordRef.current.value
    }
    socket.emit("register", userInfo);
  }

  // listen from server
  function handleRegistration(regStatus){
    switch (regStatus) {
      case status["reg-success"]: {
        setTitle(terms["reg-success-t"])
        setParag(terms["reg-success-p"])
        navigate("/login")
        break;
      }
      case status["reg-exist"]:{
        setTitle(terms["reg-exist-t"])
        setParag(terms["reg-exist-p"])
        break;
      }
      case status["reg-error"]:{
        setTitle(terms["reg-error-t"])
        setParag(terms["reg-error-p"])
        break;
      }
      default:{
        break;
      }
    }
  }
  socket.on("register status", handleRegistration);

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