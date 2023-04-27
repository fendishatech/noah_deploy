import axios from "axios";
// import jwt from "jsonwebtoken";

const ACCESS_TOKEN_COOKIE_NAME = "accessToken";
const REFRESH_TOKEN_COOKIE_NAME = "refreshToken";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4444/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  credentials: "include",
});

const getAccessToken = () => {
  return document.cookie.accessToken
    ? document.cookie
        .split(";")
        .find((row) => row.startsWith(`\${ACCESS_TOKEN_COOKIE_NAME}=`))
        ?.split("=")[1]
    : null;
};

const getRefreshToken = () => {
  return document.cookie.refreshToken
    ? document.cookie
        .split(";")
        .find((row) => row.startsWith(`\${REFRESH_TOKEN_COOKIE_NAME}=`))
        ?.split("=")[1]
    : null;
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
        config.headers.Authorization = `Bearer \${accessToken}`;
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
            config.headers.Authorization = `Bearer \${newAccessToken}`;
          } else {
            // Handle error
            console.error(response.data.message);
            // Redirect user to login page
            window.location.href = "/";
          }
        } else {
          console.log("No refresh token");
          // Redirect user to login page
          // window.location.href = "/";
        }
      }

      return config;
    } catch (error) {
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
