import { useLocation, Outlet, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect} from "react";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

function RequireAuth () {
  const { auth } = useAuth();
  const location = useLocation();
  const axiosPrivateProvider = useAxiosPrivate();
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    async function auth () {
      try {
        await axiosPrivateProvider.get("/test");
      } catch (error) {
        console.log(error);
        navigate("/login", {state: {from: location}});
      }
    }
    auth();
    return () => {
      mounted = false;
    }
  })

  return (
    auth?.username
      ? <Outlet />
      : <Navigate to="/login" state={{ from: location }} />
  )
}

export default RequireAuth;