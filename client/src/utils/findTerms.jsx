import terms from "../assets/terms.json";

function findTerm(action, message) {
  message = message ? message : `${action}-error`;
  return {
    title: terms[message]["title"],
    parag: terms[message]["parag"]
  }
}

export default findTerm;