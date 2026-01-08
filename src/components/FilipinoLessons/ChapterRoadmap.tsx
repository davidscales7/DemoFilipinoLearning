import React from "react";
import { View, StyleSheet } from "react-native";
import ChapterRow from "./ChapterRow";
import { Chapter } from "./types";

type Props = {
  chapters: Chapter[];
};

const ChapterRoadmap: React.FC<Props> = ({ chapters }) => {
  return (
    <View style={styles.container}>
      {chapters.map((chapter) => (
        <ChapterRow key={chapter.number} chapter={chapter} />
      ))}
    </View>
  );
};

export default ChapterRoadmap;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 32,
  },
});
