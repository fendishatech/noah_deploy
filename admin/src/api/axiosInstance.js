import axios from "axios";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";

const ACCESS_TOKEN_COOKIE_NAME = "accessToken";
const REFRESH_TOKEN_COOKIE_NAME = "refreshToken";
const BASE_URL = "http://localhost:4444/api/v1";
const CONTENT_TYPE = "application/json";

// Set the base URL for all Axios requests
axios.defaults.baseURL = BASE_URL;

const axiosInstance = axios.create({
  headers: {
    "Content-Type": CONTENT_TYPE,
  },
  // withCredentials: true,
});

const getAccessToken = () => {
  return Cookies.get(ACCESS_TOKEN_COOKIE_NAME);
};

const getRefreshToken = () => {
  return Cookies.get(REFRESH_TOKEN_COOKIE_NAME);
};

const isAccessTokenExpired = (accessToken) => {
  const payload = jwt.decode(accessToken);
  return payload.exp < Date.now() / 1000;
};

axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const accessToken = getAccessToken();

      if (accessToken && !isAccessTokenExpired(accessToken)) {
        // Add access token to request headers
        config.headers.Authorization = `Bearer ${accessToken}`;
      } else {
        // Get refresh token
        const refreshToken = getRefreshToken();

        if (refreshToken) {
          // Request new access token using refresh token
          const response = await axios.post("/users/refresh", {
            refreshToken,
          });

          if (response.data.success) {
            // Add new access token to request headers
            const newAccessToken = response.data.data.accessToken;
            config.headers.Authorization = `Bearer ${newAccessToken}`;
          } else {
            // Handle error
            console.error(response.data.message);
            // Redirect user to login page
            window.location.href = "/";
          }
        } else {
          // Handle error
          console.log("No refresh token");
          // Redirect user to login page
          // window.location.href = "/";
        }
      }

      return config;
    } catch (error) {
      // Handle error
      console.log(error);
      // Redirect user to login page
      window.location.href = "/";
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
