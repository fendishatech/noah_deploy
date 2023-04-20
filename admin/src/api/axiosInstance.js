import axios from "axios";
// import jwt from "jsonwebtoken";

const ACCESS_TOKEN_COOKIE_NAME = "accessToken";
const REFRESH_TOKEN_COOKIE_NAME = "refreshToken";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4444/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

const getAccessToken = () => {
  return (
    document.cookie
      .split(";")
      .find((row) => row.startsWith(`\${ACCESS_TOKEN_COOKIE_NAME}=`))
      ?.split("=")[1] || null
  );
};

const getRefreshToken = () => {
  return (
    document.cookie
      .split(";")
      .find((row) => row.startsWith(`\${REFRESH_TOKEN_COOKIE_NAME}=`))
      ?.split("=")[1] || null
  );
};

const isAccessTokenExpired = (accessToken) => {
  const payload = jwt.decode(accessToken);
  return payload.exp < Date.now() / 1000;
};

axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const accessToken = document.cookie.includes("accessToken")
        ? getAccessToken()
        : false;

      if (accessToken && !isAccessTokenExpired(accessToken)) {
        // Add access token to request headers
        config.headers.Authorization = `Bearer \${accessToken}`;
      } else {
        // Get refresh token
        const refreshToken = document.cookie.includes("refreshToken")
          ? getRefreshToken()
          : false;

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
            window.location.href = "/login";
          }
        } else {
          // Redirect user to login page
          window.location.href = "/login";
        }
      }

      return config;
    } catch (error) {
      console.log(error);
      // Redirect user to login page
      window.location.href = "/login";
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;

// import axios from "axios";
// import jwt from "jsonwebtoken";

// // Create an axios instance with default headers
// const axiosInstance = axios.create({
//   baseURL: "http://localhost:4444/api/v1/",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// const getAccessToken = () => {
//   return document.cookie
//     .split(";")
//     .find((row) => row.startsWith("accessToken="))
//     .split("=")[1];
// };

// const isAccessTokenExpired = (accessToken) => {
//   const decodedToken = jwt.decode(accessToken);
//   return decodedToken.exp < Date.now() / 1000 || null;
// };

// // Add an interceptor to automatically refresh access token
// axiosInstance.interceptors.request.use(
//   async (config) => {
//     alert("hello");
//     try {
//       const accessToken = document.cookie.includes("accessToken")
//         ? getAccessToken()
//         : null;

//       if (accessToken && !isAccessTokenExpired(accessToken)) {
//         // Add access token to request headers
//         config.headers.Authorization = `Bearer ${accessToken}`;
//       } else {
//         // Refresh access token using refresh token
//         const response = await axios.post("/users/refresh");
//         if (response.data.success) {
//           // Add new access token to request headers
//           config.headers.Authorization = `Bearer ${response.data.data.accessToken}`;
//         } else {
//           // Handle error
//           console.error(response.data.message);
//         }
//       }
//       return config;
//     } catch (error) {
//       console.log(error);
//     }
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;
