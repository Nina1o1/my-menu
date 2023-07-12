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
        // create authorization header for the first access token
        if(!req.headers?.["Authorization"]) {
          req.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
        }
        return req;
      }, (error) => { return Promise.reject(error); }
    );

    const resIntercept = axiosTookenProvider.interceptors.response.use(
      // if no error & access token is valid, return the original response
      (res) => res, 
      // handle errors
      async (error) => {
        const prevReq = error?.config;
        // if error is caused by expired access token, get a new one, and send
        // the request again
        if (error?.response?.status === 403 && !prevReq?.sent) {
          // prevent infinite loop
          prevReq.send = true;
          // request to get a new access token from server
          const newAccessToken = await refresh();
          // update authorization header
          prevReq.headers['Authorization'] = `Bearer ${newAccessToken}`;
          // send the same request again with new access token
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