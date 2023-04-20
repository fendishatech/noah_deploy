import { createContext, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import axios from "axios";

// CREATE CONTEXT HOOK
const UserAuthContext = createContext();

// SET PROVIDER COMPONENT
const UserAuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(false);

  const login = async ({ phone_no, password }) => {
    try {
      // const res = await axiosInstance.post("/users/login", {
      //   phone_no,
      //   password,
      // });
      const res = await axios.post("http://localhost:4444/api/v1/users/login", {
        phone_no,
        password,
      });
      return res.data;
    } catch (error) {
      return false;
    }
  };

  // provider returns
  return (
    <UserAuthContext.Provider value={{ currentUser, setCurrentUser, login }}>
      {children}
    </UserAuthContext.Provider>
  );
};

// EXPORT CONTEXt AND PROVIDER
export { UserAuthContext, UserAuthContextProvider };
