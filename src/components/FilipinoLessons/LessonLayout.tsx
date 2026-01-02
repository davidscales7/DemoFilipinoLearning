import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";

interface LessonLayoutProps {
  lessonNumber: number;
  mode: "lesson" | "quiz" | "summary";
  step?: number;
  total?: number;
  children: React.ReactNode;
}


const LessonLayout: React.FC<LessonLayoutProps> = ({
  lessonNumber,
  mode,
  step,
  total,
  children,
}) => {
  const pct = Math.round((step / total) * 100);

  return (
    <View style={styles.lessonCard}>
      {/* HEADER */}
      <View style={styles.topBarRow}>
        <View style={styles.pill}>
          <Text style={styles.pillText}>
            {mode === "quiz" ? "QUIZ" : `LESSON ${lessonNumber}`}
          </Text>
        </View>

        <Text style={styles.progressText}>
          {step}/{total} • {pct}%
        </Text>
      </View>

      {/* PROGRESS */}
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${pct}%` }]} />
      </View>

      {/* CONTENT */}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  lessonCard: {
    width: "100%",
    borderRadius: 24,
    padding: 24,
    backgroundColor: "rgba(255,255,255,0.92)",
    borderWidth: 1,
    borderColor: "rgba(15,23,42,0.06)",
    ...(Platform.OS === "web"
      ? { boxShadow: "0 18px 40px rgba(15,23,42,0.18)" }
      : {
          shadowColor: "#000",
          shadowOpacity: 0.16,
          shadowRadius: 20,
          shadowOffset: { width: 0, height: 14 },
          elevation: 6,
        }),
  },

  topBarRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  pill: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: "rgba(15,23,42,0.05)",
  },
  pillText: {
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 1.3,
    textTransform: "uppercase",
    opacity: 0.75,
  },

  progressText: {
    fontWeight: "800",
    opacity: 0.7,
  },

  progressTrack: {
    height: 9,
    borderRadius: 999,
    backgroundColor: "rgba(15,23,42,0.08)",
    overflow: "hidden",
    marginTop: 14,
    marginBottom: 18,
  },

  progressFill: {
    height: "100%",
    backgroundColor: "#2563EB",
  },
});

export default LessonLayout;
