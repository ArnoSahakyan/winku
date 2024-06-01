import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { store } from "../store/setup";
import { setAccessToken } from "../store/features/userInfo/userInfoSlice";
import { performLogout } from "../hooks/useAuth";

export const VITE_BACK_BASE_URL = import.meta.env.VITE_BACK_BASE_URL;

export const api = axios.create({
  baseURL: VITE_BACK_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },

  withCredentials: true,
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const userInfo = store.getState().userInfo;

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
    const userInfo = store.getState().userInfo;
    const prevRequest = error?.config;
    if (error?.response?.status === 401 && !prevRequest?.sent) {
      prevRequest.sent = true;
      try {
        const newAccessToken = (
          await axios.post(`${VITE_BACK_BASE_URL}/api/auth/refresh`, {
            refreshToken: userInfo.data.refreshToken
          })
        );
        store.dispatch(setAccessToken(newAccessToken.data.accessToken));
        prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return api(prevRequest);
      } catch (error) {
        await performLogout()
      }
    }
    return Promise.reject(error);
  }
);