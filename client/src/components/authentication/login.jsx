import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useRef, useState } from 'react';
import { axiosProvider } from '../../api/axios';
import './access.css';
import terms from "../../assets/terms.json";
import useAuth from "../../hooks/useAuth";
import findTerm from "../../utils/findTerms";

function Login() {
  document.body.classList.add("purple-page");

  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const location = useLocation();

  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const [term, setTerm] = useState("");
  
  async function handleClick (evt) {
    evt.preventDefault();
    const action = "login";

    try {
      const username = usernameRef.current.value;
      const password = passwordRef.current.value;
      
      // custom error: incomplete input
      if(!username || !password) throw {msg: "nodata"};

      const postOptions = {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      }

      // post request
      const res = await axiosProvider.post(
        `/${action}`, 
        JSON.stringify({username, password}), 
        postOptions
      );

      const accessToken = res.data?.accessToken;

      // custom error: no access token
      if(!accessToken) throw {msg: "error"};

      // set user in react context
      setAuth({username, accessToken});

      // retrieve relevant user data
      const recipes = res.data?.recipes;
      console.log(recipes);

      // redirect user to protected route of last visit
      const from = location?.state?.from?.pathname || "/";
      navigate(from);

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
            <button className="access-btn" type="submit" onClick={handleClick}>Login</button>
          </div>
        </form>
        <p className="access-switch">
          {terms["no-account"]}
          <Link to="/register"> Register</Link>
        </p>
      </div>
    </>
  )
}

export default Login;