import { useLocation, useNavigate } from "react-router-dom";
import "./edit.css";
import { LabelContainer } from "./editComponents";
import useAxiosTooken from "../../common/hooks/useAxiosTooken";
import useLogout from "../../common/hooks/useLogout";

function FormBtn({formItems}) {
  // secure post request
  const axiosTookenProvider = useAxiosTooken();
  // logout hooks
  const resetUserInfo = useLogout();
  const location = useLocation();
  const navigate = useNavigate();

  async function handleSubmit(evt) {
    evt.preventDefault();
    let recipeData = {};

    // read form data
    try {
      recipeData = readFormData(formItems);
    } catch (error) {
      console.log(error);
      return;
    }
    
    
    // post request to send or update recipe
    // TODO : update recipe
    const action = "editRecipe";
    try {
      const postOptions = {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json'}
      }
      // post request
      await axiosTookenProvider.post(
        `/${action}`, 
        JSON.stringify(recipeData),
        postOptions
        );
        
      } catch (error) {
        console.log(error);
        resetUserInfo();
        navigate("/login", {state: {from: location}});
        return;
      }
    }
    
    function handleDelete(evt) {
      
    }
    
    // read form data via useRef passed as property, consistent with database
    function readFormData (formItems) {
      if(!formItems) throw "no data"; // no input, form element is null
      const formdata = {};
      Array.from(formItems).forEach(ele => {
        if(!ele.id) return;
        const idtype = ele.id.split("-");
        switch (idtype[0]) {
  
          case "step": {
            if (!formdata?.["steps"]) formdata["steps"] = [];
            if (!ele.value) return;
            formdata["steps"].push({description: ele.value});
            break;
          }
  
          case "ingredient": {
            if (!formdata?.["ingredients"]) formdata["ingredients"] = [];
            if (!ele.value) return;
            const ingdtData = formdata["ingredients"];
            if (idtype[1] === "item") {
              ingdtData.push({item: ele.value});
            } 
            else if (idtype[1] === "amount") {
              ingdtData[ingdtData.length-1]["amount"] = ele.value;
            }
            break;
          }
          
          case "categories": {
            formdata["categories"] = [];
            break;
          }

          case "dishname": {
            if(!ele.value) throw "no dishname";
          }
  
          default: {
            console.log()
            formdata[ele.id] = ele.value;
          }
        }
      });
      return formdata;
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