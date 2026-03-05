import React from "react";
import { View, Text, StyleSheet, useWindowDimensions } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";

type QuizLayoutProps = {
  quizNumber: number;
  mode: "quiz" | "summary";
  step?: number;
  total?: number;
  children: React.ReactNode;
};

const QuizLayout: React.FC<QuizLayoutProps> = ({
  quizNumber, mode, step, total, children,
}) => {
  const theme = useTheme();
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const progress = step && total ? (step / total) * 100 : 0;

  return (
    <View style={styles.container}>
      {/* ── TOP BAR (replaces sidebar on mobile) ── */}
      <View style={[styles.topBar, { backgroundColor: theme.colors.primary }]}>
        <Text style={styles.quizLabel}>Quiz {quizNumber}</Text>

        {mode !== "summary" && step !== undefined && total !== undefined && (
          <View style={styles.topBarRight}>
            <Text style={styles.stepText}>{step} / {total}</Text>
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: `${progress}%` as any }]} />
            </View>
          </View>
        )}

        {mode === "summary" && (
          <View style={styles.completedBadge}>
            <Text style={styles.checkmark}>✓ Complete</Text>
          </View>
        )}
      </View>

      {/* ── CONTENT ── */}
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: "column" },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  quizLabel: { fontSize: 15, fontWeight: "700", color: "#FFF" },
  topBarRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
    justifyContent: "flex-end",
  },
  stepText: {
    fontSize: 14,
    fontWeight: "700",
    color: "rgba(255,255,255,0.9)",
    minWidth: 40,
    textAlign: "right",
  },
  progressTrack: {
    width: 120,
    height: 8,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 999,
    overflow: "hidden",
  },
  progressFill: { height: "100%", backgroundColor: "#FFF", borderRadius: 999 },
  completedBadge: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  checkmark: { color: "#FFF", fontWeight: "700", fontSize: 14 },
  content: { flex: 1, padding: 16 },
});

export default QuizLayout;