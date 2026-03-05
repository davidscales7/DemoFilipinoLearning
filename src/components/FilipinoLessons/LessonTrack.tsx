import React from "react";
import { View, StyleSheet, useWindowDimensions } from "react-native";
import LessonNode from "./LessonNode";
import { Lesson } from "./types";

type Props = { lessons: Lesson[] };

const LessonTrack: React.FC<Props> = ({ lessons }) => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return (
    <View style={[styles.wrapper, isMobile && styles.wrapperMobile]}>
      {lessons.map((lesson, index) => (
        <LessonNode key={index} {...lesson} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: 12,
    paddingTop: 16,
    paddingBottom: 8,
  },
  wrapperMobile: {
    flexWrap: "wrap",
    gap: 12,
    justifyContent: "flex-start",
  },
});

export default LessonTrack;