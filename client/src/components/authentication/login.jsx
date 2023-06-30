import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useRef, useState } from 'react';
import { axiosProvider } from '../../api/axios';
import './access.css';
import useAuth from "../../hooks/useAuth";
import useTerms from '../../hooks/useTerms';

function Login() {
  document.body.classList.add("purple-page");

  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const location = useLocation();

  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  
  const [term, setTerm] = useState("");
  const findTerm = useTerms();
  
  // post request
  async function handleClick (evt) {
    evt.preventDefault();
    const action = "login";
    
    try {
      const username = usernameRef.current.value;
      const password = passwordRef.current.value;
      
      if(!username || !password) {
        setTerm(findTerm(action, "nodata"));
        return;
      }

      const postOptions = {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      }

      const res = await axiosProvider.post(
        `/${action}`, 
        JSON.stringify({username, password}), 
        postOptions
      );

      // set user state
      const accessToken = res.data?.accessToken;
      setAuth({username, accessToken});

      const from = location?.state?.from?.pathname || "/";
      navigate(from);

    } catch (error) {
      // handle user errors
      const message = error?.response?.data["message"];
      setTerm(findTerm(action, message));
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

export default Login;