// CLIENT SIDE SAMPLE CODE
// const refreshAccessToken = async () => {
//   try {
//     const response = await axios.post("/api/refresh");
//     // Get the new access token from the "accessToken" cookie
//     const accessToken = getCookie("accessToken");
//     // Set the new access token in the Authorization header
//     axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
//   } catch (error) {
//     console.log(error);
//   }
// };

// Helper function to get a cookie by name
// const getCookie = (name) => {
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) {
//     return parts.pop().split(";").shift();
//   }
// };

// const refreshAccessToken = async () => {
//   try {
//     const response = await axios.post("/api/refresh");
//     // Get the new access token from the "accessToken" cookie
//     const accessToken = getCookie("accessToken");
//     // Set the new access token in the Authorization header
//     axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
//   } catch (error) {
//     console.log(error);
//   }
// };

// // Helper function to get a cookie by name
// const getCookie = (name) => {
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) {
//     return parts.pop().split(";").shift();
//   }
// };

// import jwt from "jsonwebtoken";

// const accessToken = getCookie("accessToken");

// if (accessToken) {
//   const decodedToken = jwt.decode(accessToken);
//   const user = {
//     id: decodedToken.id,
//     firstName: decodedToken.first_name,
//     lastName: decodedToken.last_name,
//     email: decodedToken.email,
//   };
//   // Use the user object to display user information in your UI
// }
