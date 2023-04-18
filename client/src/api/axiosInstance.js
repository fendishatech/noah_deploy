import axios from "axios";
// import jwt from "jsonwebtoken";

// Create an axios instance with default headers
const axiosInstance = axios.create({
  baseURL: "http://localhost:4444/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

const getAccessToken = () => {
  return document.cookie
    .split(";")
    .find((row) => row.startsWith("accessToken="))
    .split("=")[1];
};

const isAccessTokenExpired = (accessToken) => {
  const decodedToken = jwt.decode(accessToken);
  return decodedToken.exp < Date.now() / 1000 || null;
};

// Add an interceptor to automatically refresh access token
axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const accessToken = getAccessToken();

      if (accessToken && !isAccessTokenExpired(accessToken)) {
        // Add access token to request headers
        config.headers.Authorization = `Bearer ${accessToken}`;
      } else {
        // Refresh access token using refresh token
        const response = await axios.post("/users/refresh");
        if (response.data.success) {
          // Add new access token to request headers
          config.headers.Authorization = `Bearer ${response.data.data.accessToken}`;
        } else {
          // Handle error
          console.error(response.data.message);
        }
      }
      return config;
    } catch (error) {
      console.log(error);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;

// Example usage in a protected route
// function ProtectedRoute() {
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     // Fetch protected data using axios instance
//     axiosInstance
//       .get("/protected-data")
//       .then((response) => {
//         setData(response.data);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }, []);

//   // Render protected content
//   return (
//     <div>
//       <h1>Protected Content</h1>
//       <p>This content is protected and requires authentication.</p>
//       {data && <p>{data.message}</p>}
//     </div>
//   );
// }
