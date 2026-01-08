import React from "react";
import { View, StyleSheet } from "react-native";
import QuizNode from "./QuizNode";

const QuizTrack = ({ quizzes }: any) => {
  return (
    <View style={styles.wrapper}>
      {quizzes.map((quiz: any, index: number) => (
        <QuizNode key={index} {...quiz} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 32,
    paddingVertical: 24,
  },
});

export default QuizTrack;
