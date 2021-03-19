import React, { createContext, useState, useEffect, useContext } from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { AuthContext } from "./AuthProvider";
import axios from "axios";

export const StateContext = createContext({});
export const StateProvider = ({ children }) => {
  const [progress, setProgress] = useState(0);
  const [styleMode, setStyleMode] = useState(localStorage.getItem("styleMode") === "dark" ? "dark" : "light");

  const { server_url, token, refresh_token } = useContext(AuthContext);

  useEffect(() => {
    if (styleMode === "dark") {
      document.body.classList.add("dark");
    }
  });

  const THEME = createMuiTheme({
    typography: {
      fontFamily: '"Kanit-Light"',
      fontSize: 14,
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
    },
    palette: {
      type: styleMode,
    },
  });

  const toggleStyle = () => {
    setStyleMode((prev) => (prev === "light" ? "dark" : "light"));
    if (styleMode === "light") {
      localStorage.setItem("styleMode", "dark");
      document.body.classList.add("dark");
    } else {
      localStorage.setItem("styleMode", "light");
      document.body.classList.remove("dark");
    }
  };

  const _getWorkgroup = (obj, idx) => {
    let r_obj = [];
    for (var i in obj) {
      if (String(obj[i].cmissiongroup_id) === String(idx)) {
        r_obj.push(obj[i]);
      }
    }
    return r_obj;
  };

  const _getWork = (obj, idx) => {
    let r_obj = [];
    for (var i in obj) {
      if (String(obj[i].cworkgroup_id) === String(idx)) {
        r_obj.push(obj[i]);
      }
    }
    return r_obj;
  };

  const getData = (loop_token, option, data, callback) => {
    if (option.method === "post" || option.method === "POST") {
      axios
        .post(`${server_url}${option.path}`, data, {
          headers: { authorization: `Bear ${loop_token || token}` }, // กำหนด headers authorization เพื่อส่งให้ api ตรวจสอบ token
        })
        .then((rs) => {
          callback(rs);
        })
        .catch(async (error) => {
          if (error?.response?.status === 400 || error?.response?.status === 401) {
            refresh_token((cal) => {
              if (cal.token) {
                getData(cal.token, option, data, callback);
              }
            });
          }
        });
    } else if (option.method === "get" || option.method === "GET") {
      axios
        .get(`${server_url}${option.path}`, {
          headers: { authorization: `Bear ${loop_token || token}` }, // กำหนด headers authorization เพื่อส่งให้ api ตรวจสอบ token
        })
        .then((rs) => {
          callback(rs);
        })
        .catch(async (error) => {
          if (error?.response?.status === 400 || error?.response?.status === 401) {
            refresh_token((cal) => {
              if (cal.token) {
                getData(cal.token, option, data, callback);
              }
            });
          }
        });
    } else if (option.method === "put" || option.method === "PUT") {
      axios
        .put(`${server_url}${option.path}`, data, {
          headers: { authorization: `Bear ${loop_token || token}` }, // กำหนด headers authorization เพื่อส่งให้ api ตรวจสอบ token
        })
        .then((rs) => {
          callback(rs);
        })
        .catch(async (error) => {
          if (error?.response?.status === 400 || error?.response?.status === 401) {
            refresh_token((cal) => {
              if (cal.token) {
                getData(cal.token, option, data, callback);
              }
            });
          }
        });
    } else if (option.method === "patch" || option.method === "PATCH") {
      axios
        .patch(`${server_url}${option.path}`, data, {
          headers: { authorization: `Bear ${loop_token || token}` }, // กำหนด headers authorization เพื่อส่งให้ api ตรวจสอบ token
        })
        .then((rs) => {
          callback(rs);
        })
        .catch(async (error) => {
          if (error?.response?.status === 400 || error?.response?.status === 401) {
            refresh_token((cal) => {
              if (cal.token) {
                getData(cal.token, option, data, callback);
              }
            });
          }
        });
    } else if (option.method === "delete" || option.method === "DELETE") {
      axios
        .delete(`${server_url}${option.path}`, {
          headers: { authorization: `Bear ${loop_token || token}` }, // กำหนด headers authorization เพื่อส่งให้ api ตรวจสอบ token
        })
        .then((rs) => {
          callback(rs);
        })
        .catch(async (error) => {
          if (error?.response?.status === 400 || error?.response?.status === 401) {
            refresh_token((cal) => {
              if (cal.token) {
                getData(cal.token, option, data, callback);
              }
            });
          }
        });
    }
  };

  return (
    <StateContext.Provider
      value={{
        progress,
        styleMode,
        setProgress,
        toggleStyle,
        _getWorkgroup,
        _getWork,
        getData,
      }}
    >
      <ThemeProvider theme={THEME}>{children}</ThemeProvider>
    </StateContext.Provider>
  );
};
