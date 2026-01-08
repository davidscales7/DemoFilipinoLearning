import React from "react";
import { View, Text, StyleSheet } from "react-native";
import LessonTrack from "./LessonTrack";
import { Chapter } from "./types";

type Props = {
  chapter: Chapter;
};

const ChapterRow: React.FC<Props> = ({ chapter }) => {
  const completedCount = chapter.lessons.filter(
    (l) => l.completed
  ).length;

  return (
    <View style={styles.container}>
      
    <View style={styles.header}>
  <View>
    <Text style={styles.title}>
      Chapter {chapter.number} — {chapter.title}
    </Text>

    <Text style={styles.progress}>
      {completedCount} / {chapter.lessons.length} completed
    </Text>
  </View>
</View>

{/* ✅ Chapter progress bar */}
<View style={styles.track}>
  <View
    style={[
      styles.trackFill,
      {
        width: `${(completedCount / chapter.lessons.length) * 100}%`,
      },
    ]}
  />
</View>

<LessonTrack lessons={chapter.lessons} />

    </View>
  );
};

export default ChapterRow;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    maxWidth: 900,
    marginBottom: 56,
    alignSelf: "center",
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
  },
  progress: {
    marginTop: 4,
    color: "#777",
  },
  track: {
  height: 8,
  backgroundColor: "#e5e7eb",
  borderRadius: 999,
  overflow: "hidden",
  marginBottom: 20,
},

trackFill: {
  height: "100%",
  backgroundColor: "#22c55e",
  borderRadius: 999,
},

});
