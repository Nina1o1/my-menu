import { Link, useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import './access.css';
import terms from "../../assets/terms.json";
import { axiosProvider } from '../../api/axios';
import findTerm from "../../utils/findTerms";

function Register() {
  document.body.classList.add("purple-page");
  
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();
  const [term, setTerm] = useState("");

  async function handleClick (evt) {
    evt.preventDefault();
    const action = "register";

    try {
      const username = usernameRef.current.value;
      const password = passwordRef.current.value;
      
      // custom error: incomplete input
      if(!username || !password) throw {msg: "nodata"};
      
      const postOptions = {
        headers: { 'Content-Type': 'application/json'}
      }
      
      // post request
      await axiosProvider.post(
        `/${action}`, 
        JSON.stringify({username, password}),
        postOptions
      );

      navigate("/login");

    } catch (error) {
      console.log(error);
      // read custom error / error of user response
      const message = error.msg || error?.response?.data["msg"];
      setTerm(findTerm(message));
      return;
    }
  }

  return(
    <>
      <div className="access-container">
        <div className="access-alerts">
          <h1 className="access-msg-title">{term["title"]}</h1>
          <p className="access-msg-p">{term["parag"]}</p>
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
          {terms["have-account"]}
          <Link to="/login"> Login</Link>
        </p>
      </div>
    </>
  )
}

export default Register