import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./edit.css";
import { LabelContainer } from "./editComponents";
import { readFormData } from "./editHelper";
import useAxiosTooken from "../../common/hooks/useAxiosTooken";
import useLogout from "../../common/hooks/useLogout";
import { addRecipe, updateRecipe, deleteRecipe } from "../../features/recipesSlice";

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
    
    let formdata = {};

    // if editing an existing recipe, use recipe id to target and modify in server
    if(recipe?.["_id"]) formdata["_id"] = recipe["_id"];
    // read form data
    try {
      readFormData(formItems, formdata);
    } catch (error) {
      console.log(error);
      return;
    }

    // post request to send the updated / new recipe
    const action = "editRecipe";
    try {
      const postOptions = {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json'}
      }
      const res = await axiosTookenProvider.post(
        `/${action}`, 
        JSON.stringify(formdata),
        postOptions
      );
      const retRecipe = res.data;

      // update / add recipe to redux store
      if (recipe?.["_id"]) {
        dispatch(updateRecipe(retRecipe));
      } 
      else {
        dispatch(addRecipe(retRecipe));
      }
      navigate("/", {state: retRecipe});
    } catch (error) {
      console.log(error);
      return;
      resetUserInfo();
      navigate("/login", {state: {from: location}});
    }
  }

  async function handleDelete(evt) {
    evt.preventDefault();
    
    if(recipe?.["_id"]){
      const recipeId = {recipeId: recipe["_id"]};
      // post request to delete recipe in database
      try {
        const action = "deleteRecipe";
        const postOptions = {
          withCredentials: true,
          headers: { 'Content-Type': 'application/json'}
        }
        await axiosTookenProvider.post(
          `/${action}`, 
          JSON.stringify(recipeId),
          postOptions
        );
        console.log(recipe);
        dispatch(deleteRecipe(recipe));
        navigate("/");
      } catch (error) {
        console.log(error);
        return;
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