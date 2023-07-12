import { Link, useNavigate } from 'react-router-dom';
import { axiosProvider } from '../../common/api/axios';
import useAuth from "../../common/hooks/useAuth";

function Logout() {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  async function handleClick(evt) {
    evt.preventDefault();
    const action = "logout";

    try {
      const postOptions = { withCredentials: true };
      await axiosProvider.post(`/${action}`, null, postOptions);
      setAuth({});
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