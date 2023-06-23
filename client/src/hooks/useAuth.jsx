import { useContext } from "react";
import { AuthContext } from "../context/authProvider";

// this hook simply reads AuthContext, which contains auth state {auth, setAuth}
const useAuth = () => { return useContext(AuthContext) };

export default useAuth;