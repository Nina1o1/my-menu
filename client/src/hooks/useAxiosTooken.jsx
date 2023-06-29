import { useEffect } from "react";
import { axiosTookenProvider } from "../api/axios";
import useAuth from "./useAuth";
import useRefreshToken from "./useRefreshToken";

const useAxiosTooken = () => {
  const { auth } = useAuth();
  const refresh = useRefreshToken();

  useEffect(() => {

    const reqIntercrpt = axiosTookenProvider.interceptors.request.use(
      (req) => {
        if(!req.headers?.["Authorization"]) {
          req.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
        }
        return req;
      }, (error) => { return Promise.reject(error); }
    );

    const resIntercept = axiosTookenProvider.interceptors.response.use(
      (res) => res, 
      async (error) => {
        // if access token expires, replace it and send another request
        const prevReq = error?.config;
        if (error?.response?.status === 403 && !prevReq?.sent) {
          prevReq.send = true;
          const newAccessToken = await refresh();
          prevReq.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return axiosTookenProvider(prevReq);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosTookenProvider.interceptors.request.eject(reqIntercrpt);
      axiosTookenProvider.interceptors.response.eject(resIntercept);
    }
  }, [auth, refresh]);

  return axiosTookenProvider;
}

export default useAxiosTooken;