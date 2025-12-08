// src/theme/components.tsx
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "./ThemeProvider";

/* 🔹 BUTTON COMPONENT */
export const AppButton = ({ title, onPress, type = "primary" }) => {
  const { colors, spacing } = useTheme();

  const styles = StyleSheet.create({
    button: {
      backgroundColor: type === "primary" ? colors.primary : colors.accent,
      padding: spacing.md,
      borderRadius: 12,
      alignItems: "center",
      marginVertical: spacing.sm,
    },
    text: {
      color: colors.textLight,
      fontWeight: "600",
      fontSize: 18,
    },
  });

  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

/* 🔹 CARD COMPONENT (for Lessons, Quizzes, Accolades, etc.) */
export const AppCard = ({ children, color }) => {
  const { colors, spacing } = useTheme();

  return (
    <View
      style={{
        backgroundColor: colors.card,
        borderRadius: 16,
        padding: spacing.md,
        marginVertical: spacing.sm,
        borderLeftWidth: 6,
        borderLeftColor: color || colors.primary,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
        elevation: 3,
      }}
    >
      {children}
    </View>
  );
};

/* 🔹 SCREEN WRAPPER COMPONENT */
export const Screen = ({ children }) => {
  const { colors, spacing } = useTheme();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        padding: spacing.lg,
      }}
    >
      {children}
    </View>
  );
};
