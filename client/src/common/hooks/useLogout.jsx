import useAuth from "./useAuth";
import { useDispatch } from "react-redux";
import { resetRecipe } from "../../features/recipesSlice";
import { resetCategory } from "../../features/categoriesSlice";

function useLogout() {
  const { setAuth } = useAuth();
  const dispatch = useDispatch();

  function resetUserInfo () {
    setAuth({});
    dispatch(resetRecipe());
    dispatch(resetCategory())
  }
  return resetUserInfo;
}

export default useLogout;