import React, { createContext, useState, useEffect } from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

export const StateContext = createContext({});
export const StateProvider = ({ children }) => {
  const [progress, setProgress] = useState(0);
  const [styleMode, setStyleMode] = useState(localStorage.getItem("styleMode") === "dark" ? "dark" : "light");

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

  return (
    <StateContext.Provider
      value={{
        progress,
        styleMode,
        setProgress,
        toggleStyle,
        _getWorkgroup,
        _getWork
      }}
    >
      <ThemeProvider theme={THEME}>{children}</ThemeProvider>
    </StateContext.Provider>
  );
};
