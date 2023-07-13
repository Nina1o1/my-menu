import "./edit.css";
import { LabelContainer } from "./editComponents";

function FormBtn({formItems}) {

  function handleSubmit(evt) {
    evt.preventDefault();
    const formdata = {};

    // read form data via useRef passed as property, consistant with database, see README
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
    console.log(formdata);
  }
  return(
    <>
        <LabelContainer />

        <div className="btn-container">
          <button className="form-btn form-delete">Delete</button>
          <button onClick={handleSubmit} className="form-btn form-submit">Submit</button>
        </div>
    </>
  )
}

export default FormBtn;