import React, { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
import configData from "../config.json";

export const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies();
  const history = useHistory();
  const server_url =
    process.env.NODE_ENV === "production"
      ? configData.SERVER_URL
      : configData.SERVER_URL_DEV;

  useEffect(() => {
    setUser(cookies.user);
  }, [cookies]);

  return (
    <AuthContext.Provider
      value={{
        user,
        cookies,
        server_url,
        setCookie,
        setUser,
        login: async (username, password) => {
          try {
            axios
              .post(`${server_url}/auth/login`, {
                username,
                password,
              })
              .then((rs) => {
                if (rs.status === 200) {
                  const decoded = jwt_decode(rs.data.accessToken);
                  setCookie("user", decoded, {
                    path: "/",
                  });
                  setCookie("token", rs.data.accessToken, { path: "/" });
                  setUser(decoded);
                  history.push("/");
                } else if (rs.status === 204) {
                  console.log(rs.data.message);
                }
              })
              .catch((error) => {
                console.log(error);
              });
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
            axios
              .delete(`${server_url}/auth/logout`, {
                refreshToken: "",
              })
              .then((rs) => {
                removeCookie("user", { path: "/" });
                removeCookie("token", { path: "/" });
                setUser(null);
                history.push("/");
              })
              .catch((error) => {
                if (error.response.status === 400) {
                  console.log(error.response.status);
                  history.push("/");
                }
              });
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
