import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { store } from "../store/setup";
import { setAccessToken } from "../store/features/userInfo/userInfoSlice";
import { useAuthLogout } from "../hooks/useAuth";


export const VITE_BACK_BASE_URL = import.meta.env.VITE_BACK_BASE_URL;

export const api = axios.create({
  baseURL: VITE_BACK_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    // "X-platform": "web"
  },

  withCredentials: true,
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const userInfo = store.getState().userInfo;
  console.log(userInfo);

  if (userInfo?.data?.accessToken) {
    config.headers["Authorization"] = `Bearer ${userInfo.data.accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error) => {
    console.log("Try AGAIN");
    const prevRequest = error?.config;
    if (error?.response?.status === 401 && !prevRequest?.sent) {
      prevRequest.sent = true;
      try {
        const newAccessToken = (
          await axios.get(`${VITE_BACK_BASE_URL}/api/auth/refresh`, {
            withCredentials: true,
            // headers: { "X-platform": "web" },
          })
        ).data.accessToken;
        store.dispatch(setAccessToken(newAccessToken));
        prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return api(prevRequest);
      } catch (error) {
        console.log(error);
        const { logout } = useAuthLogout();
        logout();
      }
    }
    return Promise.reject(error);
  }
);
