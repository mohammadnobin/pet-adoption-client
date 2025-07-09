import React from "react";
import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";

const axiosSecoure = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}`,
});

const useAxiosSecure = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  axiosSecoure.interceptors.request.use((config) => {
    config.headers.authorization = `Bearer ${user?.accessToken}`;
    return config;
  },
    (error) => {
      return Promise.reject(error);
    })
  axiosSecoure.interceptors.response.use(
    (res) => {
      return res;
    },
    (error) => {
      const status = error.status;
      if (status === 403) {
        navigate("/forbidden");
      } else if (status === 401) {
        logOut()
          .then(() => {
            navigate("/signin");
          })
          .catch(() => {});
      }
      return Promise.reject(error);
    }
  );
  return axiosSecoure;
};

export default useAxiosSecure;


