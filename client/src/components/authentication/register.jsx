import { Link, useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import './access.css';
import terms from '../../assets/terms.json';
import { axiosProvider } from '../../api/axios';

function Register() {
  document.body.classList.add("purple-page");
  const navigate = useNavigate();

  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const [title, setTitle] = useState("");
  const [parag, setParag] = useState("");


  async function handleClick (evt) {
    evt.preventDefault();
    const action = "register";

    // post request
    try {
      const userInfo = {
        username: usernameRef.current.value,
        password: passwordRef.current.value
      }
      const postOptions = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      
      const res = axiosProvider.post(`/${action}`, JSON.stringify(userInfo), postOptions);

      navigate("/login");
    } catch (error) {
      // handle user errors
      console.log(error);
      const message = error?.response?.data["message"];
      setTitle(terms[message]?.["title"] ?? terms[`${action}-error`]["title"]);
      setParag(terms[message]?.["parag"] ?? terms[`${action}-error`]["parag"]);
    }
  }

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