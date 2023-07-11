import { useLocation, Outlet, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import useAxiosTooken from "../hooks/useAxiosTooken";

// TODO: delete expired access token in auth
function ProtectedRoutes () {
  const { auth, setAuth } = useAuth();
  const location = useLocation();
  const axiosTookenProvider = useAxiosTooken();
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    async function auth () {
      if (mounted === false) return;
      try {
        // verify access token in authorization header, and request for a new 
        // one if expired
        await axiosTookenProvider.get("/api/verifyAuth");
      } catch (error) {
        // when error, or expired refresh token, log user out and memorize 
        // current location for user convenience
        console.log(error);
        setAuth({});
        navigate("/login", {state: {from: location}});
      }
    }
    auth();
    return () => {
      mounted = false;
    }
  });

  return (
    auth?.username
      ? <Outlet />
      : <Navigate to="/login" state={{ from: location }} />
  )
}

export default ProtectedRoutes;