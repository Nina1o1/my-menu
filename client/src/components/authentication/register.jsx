import { useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import './access.css';
import { axiosProvider } from '../../common/api/axios';
import findTerm from "../../common/utils/findTerms";
import AccessForm from './accessForm';

function Register() {
  document.body.classList.add("purple-page");
  
  const [term, setTerm] = useState("");
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();
  const action = "register";

  async function handleClick (evt) {
    evt.preventDefault();

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
      // read custom error / error from server response
      const message = error.msg || error?.response?.data["msg"];
      setTerm(findTerm(message));
    }
  }

  return(
    <AccessForm 
      term={term}
      usernameRef={usernameRef}
      passwordRef={passwordRef}
      handleClick={handleClick}
      action={action}/>
  )
}

export default Register