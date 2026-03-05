// src/theme/components.tsx
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "./ThemeProvider";

/* ----------------------------
   Buttons
---------------------------- */

type ButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary";
  style?: ViewStyle;
  textStyle?: TextStyle;
};

export const AppButton: React.FC<ButtonProps> = ({
  title,
  onPress,
  disabled = false,
  variant = "primary",
  style,
  textStyle,
}) => {
  const { colors, spacing } = useTheme();

  const bg =
    variant === "primary" ? colors.primary : (colors.pillBg ?? colors.accent);

  const txt =
    variant === "primary" ? colors.textLight : (colors.pillText ?? colors.text);

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        {
          backgroundColor: bg,
          paddingVertical: spacing.md,
          paddingHorizontal: spacing.lg,
          borderRadius: 14,
          alignItems: "center",
          justifyContent: "center",
          opacity: disabled ? 0.55 : 1,
        },
        // subtle shadow
        variant === "primary"
          ? {
              shadowColor: colors.primary,
              shadowOpacity: 0.25,
              shadowRadius: 8,
              shadowOffset: { width: 0, height: 4 },
              elevation: 4,
            }
          : { shadowOpacity: 0, elevation: 0 },
        style,
      ]}
    >
      <Text style={[{ color: txt, fontWeight: "800", fontSize: 16 }, textStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

/* ----------------------------
   Screen wrappers
---------------------------- */

export const Screen: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { colors, spacing } = useTheme();
  return (
    <View style={{ flex: 1, backgroundColor: colors.background, padding: spacing.lg }}>
      {children}
    </View>
  );
};

export const ScreenGradient: React.FC<{
  children: React.ReactNode;
  style?: ViewStyle;
}> = ({ children, style }) => {
  const { colors } = useTheme();
  // fallbacks if you haven't added these tokens yet
  const c1 = (colors.bg1 as string) ?? "#EEF2FF";
  const c2 = (colors.bg2 as string) ?? "#F5F3FF";

  return (
    <LinearGradient colors={[c1, c2]} style={[styles.gradientScreen, style]}>
      {children}
    </LinearGradient>
  );
};

/* ----------------------------
   Cards
---------------------------- */

// Keep your list-style card (good for accolades lists etc.)
export const AppCard: React.FC<{
  children: React.ReactNode;
  color?: string;
}> = ({ children, color }) => {
  const { colors, spacing } = useTheme();

  return (
    <View
      style={{
        backgroundColor: color ? (colors.pillBg ?? colors.card) : colors.card,
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

// NEW: centered floating card like your lessons/quizzes
export const CenteredCard: React.FC<{
  children: React.ReactNode;
  maxWidth?: number;
  style?: ViewStyle;
}> = ({ children, maxWidth = 540, style }) => {
  const { colors } = useTheme();
  return (
    <View
      style={[
        {
          width: "100%",
          maxWidth,
          backgroundColor: colors.card,
          borderRadius: 24,
          padding: 28,
          alignItems: "center",
          shadowColor: "#6366F1",
          shadowOpacity: 0.12,
          shadowRadius: 16,
          shadowOffset: { width: 0, height: 6 },
          elevation: 6,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

/* ----------------------------
   Quiz option button
---------------------------- */

type OptionButtonProps = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  selected?: boolean;
  wrong?: boolean;
  correct?: boolean;
};

export const OptionButton: React.FC<OptionButtonProps> = ({
  label,
  onPress,
  disabled = false,
  selected = false,
  wrong = false,
  correct = false,
}) => {
  const { colors } = useTheme();

  const backgroundColor = correct
    ? (colors.correctBg as string) ?? "#DCFCE7"
    : wrong
    ? (colors.wrongBg as string) ?? "#FEE2E2"
    : selected
    ? (colors.optionSelectedBg as string) ?? "#EFF6FF"
    : (colors.optionBg as string) ?? "#F3F4F6";

  const borderColor = correct
    ? (colors.correctBorder as string) ?? "#22C55E"
    : wrong
    ? (colors.wrongBorder as string) ?? "#F87171"
    : selected
    ? (colors.optionSelectedBorder as string) ?? colors.primary
    : "transparent";

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.option,
        { backgroundColor, borderColor, opacity: disabled ? 0.65 : 1 },
      ]}
    >
      <Text style={{ fontSize: 15, fontWeight: "700", color: "#1F2937", textAlign: "center" }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  gradientScreen: {
    flex: 1,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  option: {
    width: "100%",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 2,
  },
});