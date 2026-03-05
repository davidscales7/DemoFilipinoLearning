// src/theme/ThemeProvider.tsx
import React, { createContext, useContext } from "react";
import { colors } from "./colors";
import { spacing } from "./spacing";
import { typography } from "./typography";

export type Theme = {
  colors: typeof colors;
  spacing: typeof spacing;
  typography: typeof typography;
};

const ThemeContext = createContext<Theme>({
  colors,
  spacing,
  typography,
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ThemeContext.Provider value={{ colors, spacing, typography }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);