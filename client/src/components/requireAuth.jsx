import useAuth from "../hooks/useAuth";
import { useLocation, Outlet, Navigate } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { axiosPrivateProvider } from "../api/axios";

function RequireAuth () {
  const { auth } = useAuth();
  const location = useLocation();

  const navigate = useNavigate();

  async function test (e) {
    e.preventDefault();

    try {
      const response = await axiosPrivateProvider.get('/test');
    } catch (err) {
      console.error(err);
    }

}

  return (
    auth?.username
      ? <>
        <button onClick={test}>test</button>
        <Outlet />
      </>
      : <>
        <button onClick={test}>test</button>
        <Navigate to="/login" state={{ from: location }} />
      </> 
  )
}

export default RequireAuth;