import { NavLink, Link, useNavigate } from 'react-router-dom';
import './header.css';
import terms from '../assets/terms.json'
import status from "../assets/status.json"


export default function Header() {
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
  const navigate = useNavigate();

  async function handleClick(evt) {
    evt.preventDefault();
    
    // post request
    const postOptions = {
      method: "POST",
      credentials: "include",
      mode: 'cors'
    }
    const serverURL = "http://localhost:3000";
    const postURL = `${serverURL}/logout`;
    try {
      const res = await fetch(postURL, postOptions); 
      const json = await res.json();
      if(json["message"] === status["logout-success"]) {
        navigate("/login");
      }

    } catch (error) {
      console.log(error);
    }
  }

  return(
    <nav className="nav-container">
      <NavLink to="/" className="nav-item">Dictionary</NavLink>
      <NavLink to="/edit" className="nav-item">Add</NavLink>
      <span className="nav-userName">
        UserName |
        <Link className="nav-item" onClick={handleClick}> Logout</Link>
      </span>
    </nav>
  )
}