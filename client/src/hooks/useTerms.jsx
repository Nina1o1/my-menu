import terms from "../assets/terms.json";

function useTerms() {

  function findTerm(action, message) {
    message = message ? message : `${action}-error`;
    return {
      title: terms[message]["title"],
      parag: terms[message]["parag"]
    }
  }

  return findTerm;
}

export default useTerms;