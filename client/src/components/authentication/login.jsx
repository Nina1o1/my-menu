import { useNavigate, useLocation } from 'react-router-dom';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
// authentication api
import { axiosProvider } from '../../common/api/axios';
import useAuth from "../../common/hooks/useAuth";
// redux
import { loadRecipe } from '../../features/recipesSlice';
import { loadCategory } from '../../features/categoriesSlice';
// layout
import './access.css';
import AccessForm from "./accessForm";
import findTerm from "../../common/utils/findTerms";

function Login() {
  document.body.classList.add("purple-page");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const location = useLocation();

  const [term, setTerm] = useState("");
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const action = "login";
  
  async function handleClick (evt) {
    evt.preventDefault();

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

      const { accessToken, recipes, categories } = res.data;
      
      // custom error: no access token
      if(!accessToken) throw {msg: "error"};

      // set user in react context
      setAuth({username, accessToken});

      // retrieve and load user recipes to redux store
      dispatch(loadRecipe(recipes));
      dispatch(loadCategory(categories));
      // redirect user to protected route of last visit
      const from = location?.state?.from?.pathname || "/";
      navigate(from);

    } catch (error) {
      console.log(error);
      // read custom error / error from user response
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

export default Login;