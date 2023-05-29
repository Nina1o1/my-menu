import { Link } from 'react-router-dom'
import { useRef, useState } from 'react'
import './access.css'
// import socket from '../socket'

function Login() {
  document.body.classList.add("purple-page")
  
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const [title, setTitle] = useState("");
  const [parag, setParag] = useState("");
  
  // function handleClick (evt) {
  //   evt.preventDefault();
  //   const userInfo = {
  //     username: usernameRef.current.value,
  //     password: passwordRef.current.value
  //   }
  //   socket.emit("login", userInfo);
  // }
  // socket.on("login status", (data) => {
  //   // TODO: successful status or unsuccessful
  // });

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
            <button className="access-btn" type="submit" onClick={handleClick}>Login</button>
          </div>
        </form>
        <p className="access-switch">
          Do not have an account? 
          <Link to="/register"> Register</Link>
        </p>
      </div>
    </>
  )
}

export default Login