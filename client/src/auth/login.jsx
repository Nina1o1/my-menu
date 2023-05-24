import { Link } from 'react-router-dom'
import './access.css'

function Login() {
  document.body.classList.add("access-page")
  return(
    <>
      <div className="access-container">
        <form>
          <div className="access-row">
            <label className="access-label" htmlFor="username">Username:</label>
            <input className="access-bar text" type="text" name="username"/>
          </div>
          <div className="access-row">
            <label className="access-label" htmlFor="password">Password:</label>
            <input className="access-bar text" type="text" name="password"/>
          </div>
          <div className="access-row">
            <button className="access-btn" type="submit">Login</button>
          </div>
        </form>
        <p className="access-switch">
          Do not have an account? 
          <Link to="/register"> Register</Link>
        </p>
      </div>
    </>
  )
}

export default Login