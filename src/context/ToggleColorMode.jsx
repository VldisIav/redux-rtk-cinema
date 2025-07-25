import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { createContext } from "react";

export const ColorModeContext = createContext();

const ToggleColorMode = ({ children }) => {
  const [mode, setMode] = useState("dark");
  const theme = createTheme({ palette: { mode } });

  useEffect(() => {
    const modeFromLocaleStorage = localStorage.getItem("theme");
    if (modeFromLocaleStorage) {
      setMode(mode);
    } else {
      localStorage.setItem("theme", "dark");
    }
  });

  useEffect(() => {
    localStorage.setItem("theme", mode);
  }, [mode]);

  const toggleColorMode = () => {
    setMode(prevState => (prevState === "light" ? "dark" : "light"));
  };

  return (
    <ColorModeContext.Provider value={{ mode, toggleColorMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default ToggleColorMode;
