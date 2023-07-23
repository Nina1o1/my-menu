import { NavLink, Link } from 'react-router-dom';
import './header.css';
import Logout from "../authentication/logout";
import useAuth from '../../common/hooks/useAuth';
import terms from "../../assets/terms.json";
function Header() {
  return(
    <header className="header">
      <div className='header-container'>
        <h1 className="big-heading">My Menu</h1>
        <Navigate />
      </div>
    </header>
  )
}

function Navigate() {
  const { auth } = useAuth();
  return (
    <nav className="nav-container">
        <NavLink to="/" className="nav-item">Dictionary</NavLink>
        <NavLink to="/edit" className="nav-item">Add</NavLink>
        <NavLink to="/folder" className="nav-item">Folder</NavLink>
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