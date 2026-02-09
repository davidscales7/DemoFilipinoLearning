// src/components/Layout/FlashcardLayout.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";

type FlashcardLayoutProps = {
  setNumber: number;
  mode: "flashcards" | "summary";
  step?: number;
  total?: number;
  children: React.ReactNode;
};

const FlashcardLayout: React.FC<FlashcardLayoutProps> = ({
  setNumber,
  mode,
  step,
  total,
  children,
}) => {
  const theme = useTheme();

  // Calculate progress
  const progress = step && total ? (step / total) * 100 : 0;
  const radius = 40;
  const strokeWidth = 8;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <View style={styles.container}>
      {/* Sidebar */}
      <View style={[styles.sidebar, { backgroundColor: theme.colors.accent }]}>
        {mode !== "summary" && (
          <>
            {/* Progress Ring */}
            <View style={styles.progressRing}>
              <svg width={radius * 2} height={radius * 2}>
                {/* Background circle */}
                <circle
                  stroke="rgba(255,255,255,0.2)"
                  fill="transparent"
                  strokeWidth={strokeWidth}
                  r={normalizedRadius}
                  cx={radius}
                  cy={radius}
                />
                {/* Progress circle */}
                <circle
                  stroke="#FFF"
                  fill="transparent"
                  strokeWidth={strokeWidth}
                  strokeDasharray={`${circumference} ${circumference}`}
                  style={{ strokeDashoffset }}
                  strokeLinecap="round"
                  r={normalizedRadius}
                  cx={radius}
                  cy={radius}
                  transform={`rotate(-90 ${radius} ${radius})`}
                />
              </svg>
              <View style={styles.progressText}>
                <Text style={styles.progressNumber}>{step}</Text>
                <Text style={styles.progressTotal}>/{total}</Text>
              </View>
            </View>

            <Text style={styles.sidebarLabel}>Cards</Text>
          </>
        )}

        {mode === "summary" && (
          <View style={styles.completedIcon}>
            <Text style={styles.checkmark}>✓</Text>
          </View>
        )}

        <Text style={styles.setNumber}>Set {setNumber}</Text>
      </View>

      {/* Main Content */}
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  sidebar: {
    width: 120,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  progressRing: {
    position: "relative",
    width: 80,
    height: 80,
    marginBottom: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  progressText: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  progressNumber: {
    fontSize: 20,
    fontWeight: "900",
    color: "#FFF",
  },
  progressTotal: {
    fontSize: 14,
    fontWeight: "600",
    color: "rgba(255,255,255,0.8)",
  },
  sidebarLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "rgba(255,255,255,0.9)",
    marginBottom: 8,
    textAlign: "center",
  },
  setNumber: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFF",
    textAlign: "center",
  },
  completedIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  checkmark: {
    fontSize: 40,
    color: "#FFF",
    fontWeight: "900",
  },
  content: {
    flex: 1,
    padding: 20,
  },
});

export default FlashcardLayout;