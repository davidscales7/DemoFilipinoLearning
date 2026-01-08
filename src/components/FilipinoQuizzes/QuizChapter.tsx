import React from "react";
import { View, Text, StyleSheet } from "react-native";
import QuizTrack from "./QuizTrack";

const QuizChapter = ({ chapter }: any) => {
  const completed = chapter.quizzes.filter((q: any) => !q.locked).length;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Chapter {chapter.number} — {chapter.title}
      </Text>

      <Text style={styles.progress}>
        {completed} / {chapter.quizzes.length} unlocked
      </Text>

      <QuizTrack quizzes={chapter.quizzes} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    maxWidth: 900,
    alignSelf: "center",
    marginBottom: 48,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
  },
  progress: {
    marginTop: 4,
    marginBottom: 20,
    color: "#777",
  },
});

export default QuizChapter;
