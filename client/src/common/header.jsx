import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom'
import './header.css';

export default function Header() {
  return(
    <>
      <div className="header">
        <h1 className="big-heading">
          My Menu
          {/* <span class="kaomoji">{kaomoji}</span> */}
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
        UserName |
        <Link to="/login" className="nav-item"> Logout</Link>
      </span>
    </nav>
  )
}