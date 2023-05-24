import { Link } from 'react-router-dom'
import './access.css'

function Register() {
  document.body.classList.add("access-page");
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
            <button className="access-btn" type="submit">Register</button>
          </div>
        </form>
        <p className="access-switch">
          Already have an account?
          <Link to="/login"> Login</Link>
        </p>
      </div>
    </>
  )
}

export default Register