import { useLocation, Outlet, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import useAxiosTooken from "../hooks/useAxiosTooken";

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
        await axiosTookenProvider.get("/api/verifyAuth");
      } catch (error) {
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