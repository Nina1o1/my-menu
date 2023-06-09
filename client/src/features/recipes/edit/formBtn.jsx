import "./edit.css";
import { LabelContainer } from "./editComponents";
import useAxiosTooken from "../../../common/hooks/useAxiosTooken";

function FormBtn({formItems}) {
  const axiosTookenProvider = useAxiosTooken();

  async function handleSubmit(evt) {
    evt.preventDefault();
    console.log(formItems);
    if(!formItems) return; // no input, form element is null

    // read form data via useRef passed as property, consistent with database, see README
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

        default: {
          formdata[ele.id] = ele.value;
        }
      }
    });

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
        JSON.stringify(formdata),
        postOptions
      );

    } catch (error) {
      console.log(error);
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