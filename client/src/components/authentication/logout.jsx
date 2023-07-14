import { Link, useNavigate } from 'react-router-dom';
import { axiosProvider } from '../../common/api/axios';
import useAuth from "../../common/hooks/useAuth";
import { useDispatch } from "react-redux";
import { resetRecipe } from '../../features/recipes/recipesSlice';

function Logout() {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const dispatch = useDispatch();

  async function handleClick(evt) {
    evt.preventDefault();
    const action = "logout";

    setAuth({});
    dispatch(resetRecipe());
    
    try {
      const postOptions = { withCredentials: true };
      await axiosProvider.post(`/${action}`, null, postOptions);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Link className="nav-item" onClick={handleClick}>Logout</Link> 
  )
}

export default Logout;