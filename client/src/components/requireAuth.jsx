import { useLocation, Outlet, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
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
        const res = await axiosPrivateProvider.get("/test");
        // console.log(res.status);
      } catch (error) {
        console.log(error);
        navigate("/login", {state: {from: location}});
      }
    }
    auth();
    // clean up function
    return () => {
      mounted = false;
    }
  },[])


  return (
    auth?.username
      // ? <h1>{`this is ${legitToken}`}</h1>
      ? <Outlet />
      // : <h1>not authenticated, but {legitToken}</h1>
      : <Navigate to="/login" state={{ from: location }} />
  )
}

export default RequireAuth;