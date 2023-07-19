import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./edit.css";
import { LabelContainer } from "./editComponents";
import { readFormData } from "./editHelper";
import useAxiosTooken from "../../common/hooks/useAxiosTooken";
import useLogout from "../../common/hooks/useLogout";
import { addRecipe, updateRecipe } from "../../features/recipesSlice";

function FormBtn({formItems, recipe}) {
  // secure post request
  const axiosTookenProvider = useAxiosTooken();
  // logout hooks
  const resetUserInfo = useLogout();
  const location = useLocation();
  const navigate = useNavigate();
  // redux hook
  const dispatch = useDispatch();

  async function handleSubmit(evt) {
    evt.preventDefault();
    
    // read form data via useRef passed as property, consistent with database, see README for database
    let formdata = {};
    
    try {
      formdata = readFormData(formItems);
      if(recipe?.["_id"]) formdata["_id"] = recipe["_id"];
    } catch (error) {
      console.log(error);
      return;
    }

    // post request to send or update recipe
    try {
      const action = "editRecipe";
      const postOptions = {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json'}
      }
      const res = await axiosTookenProvider.post(
        `/${action}`, 
        JSON.stringify(formdata),
        postOptions
      );
      const retRecipe = res.data

      // update / add recipe to redux store
      if (recipe?.["_id"]) {
        // TODO
        dispatch(updateRecipe(retRecipe));
      } else {
        dispatch(addRecipe(retRecipe));
      }
      navigate("/", {state: retRecipe});
    } catch (error) {
      console.log(error);
      resetUserInfo();
      navigate("/login", {state: {from: location}});
    }
  }

  async function handleDelete(evt) {
    evt.preventDefault();
    
    if(recipe?.["_id"]){
      try {
        const action = "deleteRecipe";
        const postOptions = {
          withCredentials: true,
          headers: { 'Content-Type': 'application/json'}
        }
        // post request
        await axiosTookenProvider.post(
          `/${action}`, 
          JSON.stringify({recipeId: recipe["_id"]}),
          postOptions
        );
        // navigate("/");
      } catch (error) {
        console.log(error);
      }
    }
    else{
      formItems.reset();
    }
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