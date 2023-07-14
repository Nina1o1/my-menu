import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { axiosProvider } from '../../common/api/axios';
import './access.css';
import terms from "../../assets/terms.json";
import useAuth from "../../common/hooks/useAuth";
import findTerm from "../../common/utils/findTerms";
import { loadRecipe } from '../../features/recipes/recipesSlice';

function Login() {
  document.body.classList.add("purple-page");

  const dispatch = useDispatch();
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

      // retrieve and read user recipes to redux store
      const recipes = res.data?.recipes;
      recipes.forEach(recipe => {
        const filtered = {
          _id: recipe["_id"], 
          categories: recipe["categories"], 
          dishname: recipe["dishname"],
          ingredients: recipe["ingredients"].map(ingdt => ingdt["item"])
        };
        dispatch(loadRecipe(filtered));
      });

      // console.log(store.getState());

      // redirect user to protected route of last visit
      const from = location?.state?.from?.pathname || "/";
      navigate(from);

    } catch (error) {
      console.log(error);
      // read custom error / error from user response
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
          <p className="access-msg-parag">{term["parag"]}</p>
        </div>

        <form>
          <div className="access-row">
            <label className="access-label">Username:</label>
            <input className="access-bar text" type="text" name="username" ref={usernameRef} required/>
          </div>
          <div className="access-row">
            <label className="access-label">Password:</label>
            <input className="access-bar text" type="password" name="password" ref={passwordRef} required/>
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