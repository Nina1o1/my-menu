import terms from "../../assets/terms.json";

function findTerm(message) {
  if (!message) message = "error";
  return {
    title: terms[message]["title"],
    parag: terms[message]["parag"]
  }
}

export default findTerm;