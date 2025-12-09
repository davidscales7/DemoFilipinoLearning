// src/context/XPContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getLevelFromXP, getProgressPercent } from "../utils/levelSystem";

type XPContextType = {
  xp: number;
  level: number;
  percent: number;
  addXP: (amount: number) => Promise<void>;
};

const XPContext = createContext<XPContextType | undefined>(undefined);

export const XPProvider = ({ children }) => {
  const [xp, setXP] = useState(0);

  // Load XP on startup
  useEffect(() => {
    async function loadXP() {
      const stored = await AsyncStorage.getItem("xp");
      if (stored) setXP(parseInt(stored, 10));
    }
    loadXP();
  }, []);

  // Save XP when changed
  useEffect(() => {
    AsyncStorage.setItem("xp", xp.toString());
  }, [xp]);

  // Derived values
  const { percent, level } = getProgressPercent(xp);

  // Add XP (called after lesson completion)
  async function addXP(amount: number) {
    setXP((prev) => prev + amount);
  }

  return (
    <XPContext.Provider value={{ xp, level, percent, addXP }}>
      {children}
    </XPContext.Provider>
  );
};

// Custom hook
export const useXP = () => {
  const context = useContext(XPContext);
  if (!context)
    throw new Error("useXP must be used inside an XPProvider");
  return context;
};
