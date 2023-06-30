import { NavLink, Link } from 'react-router-dom';
import './header.css';
import Logout from "../authentication/logout";
import useAuth from '../../hooks/useAuth';
import terms from "../../assets/terms.json";
function Header() {
  const { auth } = useAuth();
  return(
    <div className="header">
      <h1 className="big-heading">My Menu</h1>
      <Navigate />
    </div>
  )
}

function Navigate() {
  const { auth } = useAuth();
  return (
    <nav className="nav-container">
        <NavLink to="/" className="nav-item">Dictionary</NavLink>
        <NavLink to="/edit" className="nav-item">Add</NavLink>
        <span className="nav-userName">
          { auth?.username
            ? ( 
              <> 
                {`${auth.username || "username"} | `} 
                <Logout/>
              </> 
            )
            : ( 
              <> 
                {`${terms["unlogged-user"]} | `}
                <Link to="/login" className="nav-login">Login</Link>
              </> 
            )
          }
        </span>
    </nav>
  )
}

export default Header;

/*

*/