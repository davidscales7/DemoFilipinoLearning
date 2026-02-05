// src/components/Quiz/QuizChapter.tsx
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../../theme/ThemeProvider";

type Quiz = {
  title: string;
  icon: string;
  color: string;
  locked: boolean;
  completed?: boolean; // ✅ Add completion status
  onPress: () => void;
};

type Chapter = {
  number: number;
  title: string;
  quizzes: Quiz[];
};

type QuizChapterProps = {
  chapter: Chapter;
};

const QuizChapter: React.FC<QuizChapterProps> = ({ chapter }) => {
  const theme = useTheme();

  return (
    <View style={styles.chapterContainer}>
      {/* Chapter Header */}
      <View style={styles.chapterHeader}>
        <Text style={styles.chapterNumber}>Chapter {chapter.number}</Text>
        <Text style={styles.chapterTitle}>{chapter.title}</Text>
      </View>

      {/* Quiz Cards */}
      {chapter.quizzes.map((quiz, index) => (
        <TouchableOpacity
          key={index}
          onPress={quiz.onPress}
          disabled={quiz.locked}
          style={[
            styles.quizCard,
            quiz.locked && styles.lockedCard,
          ]}
        >
          {/* Icon Circle */}
          <View
            style={[
              styles.iconCircle,
              { backgroundColor: quiz.locked ? "#D1D5DB" : quiz.color },
            ]}
          >
            <MaterialCommunityIcons
              name={quiz.icon as any}
              size={28}
              color="white"
            />
          </View>

          {/* Quiz Info */}
          <View style={styles.quizInfo}>
            <Text
              style={[
                styles.quizTitle,
                quiz.locked && styles.lockedText,
              ]}
            >
              {quiz.title}
            </Text>
          </View>

          {/* Status Indicator */}
          <View style={styles.statusContainer}>
            {quiz.locked ? (
              <MaterialCommunityIcons
                name="lock"
                size={24}
                color="#9CA3AF"
              />
            ) : quiz.completed ? (
              <MaterialCommunityIcons
                name="check-circle"
                size={24}
                color="#22C55E"
              />
            ) : (
              <MaterialCommunityIcons
                name="chevron-right"
                size={24}
                color="#9CA3AF"
              />
            )}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  chapterContainer: {
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  chapterHeader: {
    marginBottom: 16,
  },
  chapterNumber: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6B7280",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  chapterTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#111827",
    marginTop: 4,
  },
  quizCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  lockedCard: {
    opacity: 0.6,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
  },
  quizInfo: {
    flex: 1,
    marginLeft: 16,
  },
  quizTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
  lockedText: {
    color: "#9CA3AF",
  },
  statusContainer: {
    marginLeft: 8,
  },
});

export default QuizChapter;