import { useEffect } from "react";
import { axiosPrivateProvider } from "../api/axios";
import useAuth from "./useAuth";
import useRefreshToken from "./useRefreshToken";

const useAxiosPrivate = () => {
  const { auth } = useAuth();
  const refresh = useRefreshToken();

  useEffect(() => {

    const reqIntercrpt = axiosPrivateProvider.interceptors.request.use(
      (req) => {
        if(!req.headers?.["authorization"]) {
          req.headers["authorization"] = `Bearer ${auth?.accessToken}`;
        }
        return req;
      }, (error) => { return Promise.reject(error); }
    );

    const resIntercept = axiosPrivateProvider.interceptors.response.use(
      (res) => res, 
      async (error) => {
        // if access token expires, replace it and send another request
        const prevReq = error?.config;
        console.log(error.config);
        if (error?.response?.status === 403 && !prevReq?.sent) {
          prevReq.send = true;
          const newAccessToken = await refresh();
          prevReq.headers['authorization'] = `Bearer ${newAccessToken}`;
          return axiosPrivateProvider(prevReq);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivateProvider.interceptors.request.eject(reqIntercrpt);
      axiosPrivateProvider.interceptors.response.eject(resIntercept);
    }
  }, [auth, refresh]);

  return axiosPrivateProvider;
}

export default useAxiosPrivate;