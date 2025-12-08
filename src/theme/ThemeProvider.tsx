// src/theme/ThemeProvider.tsx
import React, { createContext, useContext } from "react";
import { colors } from "./colors";
import { spacing } from "./spacing";
import { typography } from "./typography";

const ThemeContext = createContext({ colors, spacing, typography });

export const ThemeProvider = ({ children }) => {
  return (
    <ThemeContext.Provider value={{ colors, spacing, typography }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
