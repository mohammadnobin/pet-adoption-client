import { useEffect } from "react";
import axios from "axios";

import { useNavigate } from "react-router";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

const useAxiosSecure = () => {
  const { user, logOut, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user?.accessToken) {
      const requestInterceptor = axiosSecure.interceptors.request.use(
        (config) => {
          config.headers.authorization = `Bearer ${user.accessToken}`;
          return config;
        },
        (error) => Promise.reject(error)
      );

      const responseInterceptor = axiosSecure.interceptors.response.use(
        (res) => res,
        (error) => {
          const status = error.response?.status;
          if (status === 403) {
            navigate("/forbidden");
          } else if (status === 401) {
            logOut()
              .then(() => navigate("/signin"))
              .catch(() => {});
          }
          return Promise.reject(error);
        }
      );

      return () => {
        axiosSecure.interceptors.request.eject(requestInterceptor);
        axiosSecure.interceptors.response.eject(responseInterceptor);
      };
    }
  }, [user, loading]);

  return axiosSecure;
};

export default useAxiosSecure;

























