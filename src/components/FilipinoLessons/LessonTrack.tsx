import React from "react";
import { View, StyleSheet } from "react-native";
import LessonNode from "./LessonNode";
import { Lesson } from "./types";

type Props = {
  lessons: Lesson[];
};

const LessonTrack: React.FC<Props> = ({ lessons }) => {
  return (
    <View style={styles.wrapper}>
     

      {lessons.map((lesson, index) => (
        <LessonNode key={index} {...lesson} />
      ))}
    </View>
  );
};

export default LessonTrack;
const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    justifyContent: "center", // ✅ key change
    alignItems: "flex-start",
    gap: 32,                  // ✅ consistent spacing
    paddingVertical: 24,
  },
});
