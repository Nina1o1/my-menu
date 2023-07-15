import { Link, useNavigate } from 'react-router-dom';
import { axiosProvider } from '../../common/api/axios';
import useLogout from '../../common/hooks/useLogout';

function Logout() {
  const navigate = useNavigate();
  const resetUserInfo = useLogout();

  async function handleClick(evt) {
    evt.preventDefault();
    const action = "logout";
    
    
    try {
      const postOptions = { withCredentials: true };
      await axiosProvider.post(`/${action}`, null, postOptions);
      resetUserInfo();
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