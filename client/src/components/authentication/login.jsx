import { Link, useNavigate } from 'react-router-dom';
import { useRef, useState, useContext } from 'react';
import { AuthContext } from '../../context/authProvider';
import { axiosProvider } from '../../api/axios';
import './access.css';
import terms from "../../assets/terms.json";
// import useAuth from "../../hooks/useAuth";

function Login() {
  document.body.classList.add("purple-page");
  const navigate = useNavigate();

  // test useContext
  const { auth } = useContext(AuthContext);

  console.log(auth)
  
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const [title, setTitle] = useState("");
  const [parag, setParag] = useState("");

  // post request
  async function handleClick (evt) {
    evt.preventDefault();
    const action = "login";
    
    try {
      const userInfo = {
        username: usernameRef.current.value,
        password: passwordRef.current.value
      }
      const postOptions = {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      }

      const res = await axiosProvider.post(`/${action}`, JSON.stringify(userInfo), postOptions);

      // console.log(JSON.stringify(res?.data)); // print to test data

      // set user state
      const accessToken = res.data?.accessToken;

      navigate("/");
    } catch (error) {
      // display error messages
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