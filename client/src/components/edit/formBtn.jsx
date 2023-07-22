import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./edit.css";
import { LabelContainer } from "./editComponents";
import { readFormData } from "./editHelper";
import { addRecipe, updateRecipe, deleteRecipe } from "../../features/recipesSlice";
import useEditRecipe from "../../common/hooks/useEditRecipe";

function FormBtn({formItems, recipe}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // custome post request hook
  const editRecipe = useEditRecipe();

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
    try {
      const action = "editRecipe";
      const retRecipe = await editRecipe(action, formdata);
      // update / add recipe to redux store
      if (recipe?.["_id"]) {
        dispatch(updateRecipe(retRecipe));
      } else {
        dispatch(addRecipe(retRecipe));
      }
      navigate("/", {state: retRecipe});
    } catch (error) {
      console.log(error);
      return;
    }
  }

  async function handleDelete(evt) {
    evt.preventDefault();
    
    if(recipe?.["_id"]){
      // post request to delete recipe in database
      try {
        const recipeId = {recipeId: recipe["_id"]};
        const action = "deleteRecipe";
        const ret = await editRecipe(action, recipeId);
        dispatch(deleteRecipe(recipe));
        navigate("/");
      } catch (error) {
        console.log(error);
        return;
      }
    } else {
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