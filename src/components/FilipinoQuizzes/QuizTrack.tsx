import React from "react";
import { View, StyleSheet, useWindowDimensions } from "react-native";
import QuizNode from "./QuizNode";

const QuizTrack = ({ quizzes }: any) => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return (
    <View style={[styles.wrapper, isMobile && styles.wrapperMobile]}>
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
  wrapperMobile: {
    flexWrap: "wrap",
    gap: 16,
    paddingHorizontal: 8,
  },
});

export default QuizTrack;