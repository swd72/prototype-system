import React, { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
import configData from "../config.json";

export const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [_token_, set_Token_] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies();
  const history = useHistory();
  const server_url =
    process.env.NODE_ENV === "production"
      ? configData.SERVER_URL
      : configData.SERVER_URL_DEV;

  useEffect(() => {
    setUser(cookies.user);
    setToken(cookies.token);
    set_Token_(cookies["-token-"]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        cookies,
        server_url,
        history,
        token,
        _token_,
        setCookie,
        setUser,
        login: async (username, password) => {
          try {
            console.log(username, password);
            axios
              .post(`${server_url}/auth/login`, {
                username,
                password,
              })
              .then((rs) => {
                console.log(rs);
                if (rs.status === 200) {
                  const decoded = jwt_decode(rs.data.accessToken);
                  setCookie("user", decoded, {
                    path: "/",
                  });
                  setCookie("token", rs.data.accessToken, { path: "/" });
                  setCookie("-token-", rs.data.refreshToken, { path: "/" });

                  setUser(decoded);
                  setToken(rs.data.accessToken);
                  set_Token_(rs.data.refreshToken);
                  history.push("/");
                } else if (rs.status === 204) {
                  console.log(rs.data.message);
                }
              })
              .catch((error) => {
                console.log(error.message);
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
              .delete(`${server_url}/auth/logout/${_token_}`)
              .then((rs) => {
                removeCookie("user", { path: "/" });
                removeCookie("token", { path: "/" });
                setUser(null);
                history.push("/");
              })
              .catch((error) => {
                if (
                  error.response.status === 400 ||
                  error.response.status === 401
                ) {
                  removeCookie("user", { path: "/" });
                  removeCookie("token", { path: "/" });
                  setUser(null);
                  history.push("/");
                }
              });
          } catch (e) {
            console.error(e);
          }
        },
        refresh_token: async (callback) => {
          try {
            axios
              .post(`${server_url}/auth/refresh-token`, {
                refreshToken: _token_,
              })
              .then((rs) => {
                const decoded = jwt_decode(rs.data.accessToken);
                setCookie("user", decoded, {
                  path: "/",
                });
                setCookie("token", rs.data.accessToken, { path: "/" });
                setCookie("-token-", rs.data.refreshToken, { path: "/" });
                setUser(decoded);
                setToken(rs.data.accessToken);
                set_Token_(rs.data.refreshToken);
                callback({ token: rs.data.accessToken, user: decoded });
              })
              .catch((error) => {
                if (
                  error.response.status === 400 ||
                  error.response.status === 401
                ) {
                  removeCookie("user", { path: "/" });
                  removeCookie("token", { path: "/" });
                  setUser(null);
                  callback(false);
                  history.push("/");
                }
              });
          } catch (e) {
            console.error(e);
          }
        },
        provider_axois_get: (_path) => {
          try {
            new Promise((resolve, reject) => {
              axios
                .get(`${server_url}${_path}`)
                .then((rs) => {
                  resolve(rs);
                })
                .catch((error) => {
                  reject(error);
                });
            });
          } catch (e) {}
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
