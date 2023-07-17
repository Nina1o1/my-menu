import { useLocation, useNavigate } from "react-router-dom";
import "./edit.css";
import { LabelContainer } from "./editComponents";
import { readFormData } from "./editHelper";
import useAxiosTooken from "../../common/hooks/useAxiosTooken";
import useLogout from "../../common/hooks/useLogout";

function FormBtn({formItems, recipeId}) {
  // secure post request
  const axiosTookenProvider = useAxiosTooken();
  // logout hooks
  const resetUserInfo = useLogout();
  const location = useLocation();
  const navigate = useNavigate();

  async function handleSubmit(evt) {
    evt.preventDefault();
    
    // read form data via useRef passed as property, consistent with database, see README for database
    let formdata = {};
    
    try {
      formdata = readFormData(formItems);
      if (recipeId) formdata["_id"] = recipeId;
    } catch (error) {
      console.log(error);
      return;
    }

    // post request to send or update recipe
    // TODO : update recipe
    try {
      console.log(formdata);
      const postOptions = {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json'}
      }
      // post request
      const action = "editRecipe";
      await axiosTookenProvider.post(
        `/${action}`, 
        JSON.stringify(formdata),
        postOptions
      );

    } catch (error) {
      console.log(error);
      resetUserInfo();
      navigate("/login", {state: {from: location}});
    }
  }

  function handleDelete(evt) {
    
  }

  return(
    <>
        <LabelContainer />

        <div className="btn-container">
          <button onClick={handleDelete} className="form-btn form-delete">Delete</button>
          <button onClick={handleSubmit} className="form-btn form-submit">Submit</button>
        </div>
    </>
  )
}

export default FormBtn;