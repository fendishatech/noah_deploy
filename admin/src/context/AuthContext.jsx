import { createContext, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import axios from "axios";

// CREATE CONTEXT HOOK
const UserAuthContext = createContext();

// SET PROVIDER COMPONENT
const UserAuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});

  const login = async ({ phone_no, password }) => {
    try {
      try {
        const res = await axiosInstance.post("/users/login", {
          phone_no,
          password,
        });
        console.log("At auth context");
        console.log({ res });
        return res;
      } catch (error) {
        console.log(error.message);
      }
    } catch (error) {
      return false;
    }
  };

  const logout = async () => {
    try {
      const res = await axiosInstance.post("/users/logout", {
        phone_no,
        password,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  // provider returns
  return (
    <UserAuthContext.Provider
      value={{ currentUser, setCurrentUser, login, logout }}
    >
      {children}
    </UserAuthContext.Provider>
  );
};

// EXPORT CONTEXt AND PROVIDER
export { UserAuthContext, UserAuthContextProvider };
