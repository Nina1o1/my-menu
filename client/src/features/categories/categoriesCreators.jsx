function addCategory(inputName) {
  if (typeof inputName !== "string") return;

  return {
    type: "category/addCategory",
    payload: inputName
  }
}

function updateCategory(targetName, inputName) {
  if (typeof targetName !== "string" || typeof inputName !== "string") return;

  return {
    type: "category/updateCategory",
    payload: {
      target: targetName,
      input: inputName
    }
  }
}

function deleteCategory(targetName) {
  if(typeof targetName !== "string") return;

  return {
    type: "category/deleteCategory",
    payload: targetName
  }
}

export {
  addCategory,
  updateCategory,
  deleteCategory
};