import axios from "axios";

const API = axios.create({

  baseURL: `${import.meta.env.VITE_API_URL}/api`,

});

// ================= REQUEST INTERCEPTOR =================

API.interceptors.request.use(

  (config) => {

    const token = localStorage.getItem("access");

    if (token) {

      config.headers.Authorization = `Bearer ${token}`;

    }

    return config;

  },

  (error) => Promise.reject(error)

);

// ================= RESPONSE INTERCEPTOR =================

API.interceptors.response.use(

  (response) => response,

  async (error) => {

    const originalRequest = error.config;

    if (

      error.response?.status === 401 &&
      !originalRequest._retry

    ) {

      originalRequest._retry = true;

      try {

        const refresh = localStorage.getItem("refresh");

        const res = await axios.post(

          `${import.meta.env.VITE_API_URL}/api/token/refresh/`,

          { refresh }

        );

        const newAccess = res.data.access;

        localStorage.setItem(
          "access",
          newAccess
        );

        originalRequest.headers.Authorization =
          `Bearer ${newAccess}`;

        return API(originalRequest);

      } catch (err) {

        localStorage.clear();

        window.location.href = "/login";

      }

    }

    return Promise.reject(error);

  }

);

export default API;