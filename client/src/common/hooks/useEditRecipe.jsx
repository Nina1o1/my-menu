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
      console.log("error");
      // expired refresh token, log out
      if(error.response.status === 402) {
        navigate("/login", {state: {from: location}});
        resetUserInfo();
      }
      // server error 
      else {
        return;
      }
    }
    return res?.data;
  }
  
  return editRecipe;
}

export default useEditRecipe;