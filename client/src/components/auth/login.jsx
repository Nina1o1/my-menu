import { Link, useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import { axiosProvider } from '../../api/axios';
import './access.css';
import terms from "../../assets/terms.json";
import status from "../../assets/status.json";

function Login() {
  document.body.classList.add("purple-page");
  const navigate = useNavigate();

  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const [title, setTitle] = useState("");
  const [parag, setParag] = useState("");
  
  async function handleClick (evt) {
    evt.preventDefault();
    const action = "login";
    
    // post request
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

      navigate("/")
    } catch (error) {
      // display error messages
      const message = error?.response?.data["message"];
      setTitle(terms[message]?.["title"] ?? terms[`${action}-error`]["title"]);
      setParag(terms[message]?.["parag"] ?? terms[`${action}-error`]["parag"]);
  }

  // fetch
      /*
      try {
        const serverURL = "http://localhost:3000";
        const action = "login";
    
        const userInfo = {
          username: usernameRef.current.value,
          password: passwordRef.current.value
        }
        const postOptions = {
          baseURL: `/${action}`,
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          },
        }

        const res = await axios.post(
          serverURL,
          JSON.stringify(userInfo),
          postOptions
        )

        console.log(res)
      } catch(error) {
        console.log(error)
      }
      */
    /*
      const serverURL = "http://localhost:3000";
      const action = "login";
      const postURL = new URL(action, serverURL).toString();

      const userInfo = {
        username: usernameRef.current.value,
        password: passwordRef.current.value
      }
    
      const postOptions = {
        method: "POST",
        credentials: "include",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify(userInfo)
      }

      try {
        
        const res = await fetch(postURL, postOptions);
        const json = await res.json();

        // console.log(json["accessToken"]); // check on response messages

        switch (json["message"]) {
          case status[`${action}-success`]: {
            navigate("/");
          }
          default:{
            setTitle(terms[`${json["message"]}`]?.["title"]??"");
            setParag(terms[`${json["message"]}`]?.["parag"]??"");
            break;
          }
        }
      } catch (error) {
        console.log(error);
        setTitle(terms[`${action}-error`]?.["title"]??"");
        setParag(terms[`${action}-error`]?.["parag"]??"");
      }
      */


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