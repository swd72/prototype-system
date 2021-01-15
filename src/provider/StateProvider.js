import React, { createContext, useState } from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

export const StateContext = createContext({});
export const StateProvider = ({ children }) => {
  const [progress, setProgress] = useState(0);
  const [styleMode, setStyleMode] = useState(
    localStorage.getItem("styleMode") === "dark" ? "dark" : "light"
  );

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
    localStorage.setItem("styleMode", styleMode === "light" ? "dark" : "light");
  };

  return (
    <StateContext.Provider
      value={{
        progress,
        styleMode,
        setProgress,
        toggleStyle,
      }}
    >
      <ThemeProvider theme={THEME}>{children}</ThemeProvider>
    </StateContext.Provider>
  );
};
