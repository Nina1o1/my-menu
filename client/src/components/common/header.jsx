import { NavLink} from 'react-router-dom';
import './header.css';
import Logout from "../authentication/logout";

import useAuth from '../../hooks/useAuth';
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

  return(
    <nav className="nav-container">
      <NavLink to="/" className="nav-item">Dictionary</NavLink>
      <NavLink to="/edit" className="nav-item">Add</NavLink>
      <span className="nav-userName">
        {"userName | "}
        <Logout/>
      </span>
    </nav>
  )
}

export default Header;