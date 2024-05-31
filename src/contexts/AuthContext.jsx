// AuthContext.js
import React, { createContext } from "react";
import { MainRoutes } from "../pages/MainRoutes";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  // Your authentication logic here
  return (
    <AuthContext.Provider value={<MainRoutes/>}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
