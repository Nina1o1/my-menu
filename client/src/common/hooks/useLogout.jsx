import useAuth from "./useAuth";
import { useDispatch } from "react-redux";
import { resetRecipe } from "../../features/recipesSlice";

function useLogout() {
  const { setAuth } = useAuth();
  const dispatch = useDispatch();

  function resetUserInfo () {
    setAuth({});
    dispatch(resetRecipe());
  }
  return resetUserInfo;
}

export default useLogout;