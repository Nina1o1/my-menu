import { NavLink } from 'react-router-dom';
import './header.css';
import Logout from "../authentication/logout";
import useAuth from '../../hooks/useAuth';
import terms from "../../assets/terms.json";
function Header() {
  return(
    <>
      <div className="header">
        <h1 className="big-heading">
          My Menu
        </h1>
        <Navigation />
      </div>
    </>
  )
}

function Navigation() {
  const { auth } = useAuth();

  return(
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
          : ( `${terms["unlogged-user"]}` )
        }
      </span>
      
    </nav>
  )
}

export default Header;