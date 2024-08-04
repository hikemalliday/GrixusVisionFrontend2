import axios, { AxiosResponse, AxiosError, AxiosInstance } from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export const useAxios = (
  baseURL: string,
  enableInterceptors: boolean = true
): AxiosInstance => {
  const navigate = useNavigate();
  const axiosInstance = axios.create({ baseURL, withCredentials: true });
  const { accessToken, setAccessToken, refreshToken, clear } = useAuthContext();

  if (!enableInterceptors) {
    return axiosInstance;
  }

  axiosInstance.interceptors.request.use(
    (config) => {
      if (accessToken !== "" && !config.headers.Authorization) {
        config.headers["Authorization"] = `Bearer ` + accessToken;
      }
      return config;
    },
    (error: Error) => {
      Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    async (error) => {
      const err = error as AxiosError;
      const originalRequest = error.config;
      // @ts-ignore
      if (err.response.status === 401 && !originalRequest._retry) {
        try {
          originalRequest._retry = true;
          const { data } = await axiosInstance.post("/token/refresh/", {
            refresh: refreshToken,
          });
          if (data !== undefined) {
            setAccessToken(data.access);
            originalRequest.headers.Authorization = `Bearer ${data.access}`;
            // Clear params, else it appends duplicate query params
            originalRequest.params = {};
            return axiosInstance(originalRequest);
          }
        } catch (promiseErr) {
          clear();
          navigate("/login");
          return console.error(promiseErr);
        }
      }
      await Promise.reject(error);
    }
  );
  return axiosInstance;
};
