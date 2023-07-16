import { Link } from "react-router-dom";
import "./access.css";
import terms from "../../assets/terms.json";
import Footer from "../common/footer"

function AccessForm({term, usernameRef, passwordRef, handleClick, action}) {
  const linkTo = action === "login" ? "register" : "login";
  return (
    <>
      <div className="access-container">

        <div className="access-alerts">
          <h1 className="access-msg-title">{term["title"]}</h1>
          <p className="access-msg-parag">{term["parag"]}</p>
        </div>

        <form>
          <div className="access-row">
            <label className="access-label">Username:</label>
            <input className="access-bar text" type="text" name="username" ref={usernameRef} required/>
          </div>
          <div className="access-row">
            <label className="access-label">Password:</label>
            <input className="access-bar text" type="password" name="password" ref={passwordRef} required/>
          </div>
          <div className="access-row">
            <button className="access-btn" type="submit" onClick={handleClick}>{action.charAt(0).toUpperCase() + action.slice(1)}</button>
          </div>
        </form>
        
          <p className="access-switch">
            {terms["no-account"]}
            <Link to={`/${linkTo}`}> {linkTo.charAt(0).toUpperCase() + linkTo.slice(1)}</Link>
          </p>
      </div>
      <Footer />
    </>
  )
}
export default AccessForm;