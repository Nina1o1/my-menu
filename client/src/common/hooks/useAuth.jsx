import { useContext } from "react";
import { AuthContext } from "../context/authProvider";

// this hook simply reads AuthContext
const useAuth = () => { return useContext(AuthContext) };

export default useAuth;