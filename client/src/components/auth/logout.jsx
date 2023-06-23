import { Link, useNavigate } from 'react-router-dom';
import { axiosProvider } from '../../api/axios';
import status from "../../assets/status.json"

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
      /* fetch
      const postOptions = {
        method: "POST",
        credentials: "include",
        mode: 'cors'
      }
      const serverURL = "http://localhost:3000";
      const action = "login";
      const postURL = new URL(action, serverURL).toString();
      const res = await fetch(postURL, postOptions); 
      const json = await res.json();
      if (json["message"] === status[`${action}-success`]) {
        navigate("/login");
      }

    } catch (error) {
      console.log(error);
    }
    */
  }

  return (
    <Link className="nav-item" onClick={handleClick}> | Logout</Link> 
  )
}

export default Logout;