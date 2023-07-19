import useAxiosTooken from "./useAxiosTooken";
import useLogout from "./useLogout";

const useEditRecipe = () => {
  const axiosTookenProvider = useAxiosTooken();
  const resetUserInfo = useLogout();

  async function editRecipe(action, data) {
    let res;
    try {
      const postOptions = {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json'}
      }
      res = await axiosTookenProvider.post(
        `/${action}`, 
        JSON.stringify(data),
        postOptions
      );
    } 
    catch (error) {
      console.log(error);
      resetUserInfo();
      navigate("/login", {state: {from: location}});
      return;
    }
    return res?.data;
  }
  return editRecipe;
}

export default useEditRecipe;