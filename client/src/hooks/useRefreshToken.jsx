import { axiosProvider } from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { auth, setAuth } = useAuth();

  async function refresh () {

    // get request for a new token
    const res = await axiosProvider.post(
      "/api/refresh",
      { withCredentials: true }
    );

    // overwrite auth state
    setAuth(prev => { return {...prev, accessToken: res.data.accessToken} });
    return res.data.accessToken;
  }
  return refresh;
}

export default useRefreshToken;