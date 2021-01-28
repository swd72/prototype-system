import React, { createContext, useState, useEffect } from "react";
// import jwt_decode from "jwt-decode";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";

export const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies();
  const history = useHistory()

  useEffect(() => {
    setUser(cookies.user)
  }, [cookies])
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
            setUser({ username, password });
            history.push('/')
          } catch (e) {
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
            removeCookie("user", { path: "/" });
            setUser(null)
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
