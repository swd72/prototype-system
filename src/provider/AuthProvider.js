import React, { createContext, useState } from "react";
// import jwt_decode from "jwt-decode";
import { useCookies } from "react-cookie";

export const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(['user']);

  return (
    <AuthContext.Provider
      value={{
        user,
        cookies,
        setUser,
        login: async (username, password) => {
          try {
            console.log(username, password);
            setCookie("user", { username, password }, { path: "/" });
          } catch (e) {
            // setLoading(false);
            console.log(e);
          }
        },
        register: async (username, password) => {
          try {
          } catch (e) {
            console.log(e);
          }
        },
        logout: async () => {
          try {
            console.log('ddddd')
            removeCookie('user')
            removeCookie('name')
          } catch (e) {
            console.error(e);
          }
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
