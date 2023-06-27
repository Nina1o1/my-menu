import { Link, useNavigate } from 'react-router-dom';
import { axiosProvider } from '../../api/axios';

function Logout() {
  const navigate = useNavigate();

  async function handleClick(evt) {
    evt.preventDefault();
    const action = "logout";

    try {
      const postOptions = {
        withCredentials: true
      }
      const res = axiosProvider.post(`/${action}`, null, postOptions);
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