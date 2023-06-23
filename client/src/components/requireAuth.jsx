import useAuth from "../hooks/useAuth";
import { useLocation, Outlet, Navigate } from "react-router-dom";

function RequireAuth () {
  const { auth } = useAuth();
  const location = useLocation();
  return (
    auth?.username
      ? <Outlet />
      // : <Navigate to="/login" state={{ msg: "hi"}}/>
      : <Navigate to="/login" state={{ from: location }} />
  )
}

export default RequireAuth;