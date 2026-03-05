import React from "react";
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Platform,
} from "react-native";
import LessonTrack from "./LessonTrack";
import { Chapter } from "./types";

type Props = { chapter: Chapter };

const ChapterRow: React.FC<Props> = ({ chapter }) => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const completedCount = chapter.lessons.filter((l) => l.completed).length;
  const total = chapter.lessons.length;
  const progressPct = Math.round((completedCount / total) * 100);
  const allDone = completedCount === total;

  return (
    <View style={[styles.container, isMobile && styles.containerMobile]}>
      {/* ── Chapter header card ── */}
      <View style={styles.headerCard}>
        {/* Chapter number badge */}
        <View style={[styles.chapterBadge, allDone && styles.chapterBadgeDone]}>
          <Text style={styles.chapterBadgeText}>
            {allDone ? "✓" : `${chapter.number}`}
          </Text>
        </View>

        <View style={styles.headerText}>
          <Text style={[styles.chapterLabel]}>Chapter {chapter.number}</Text>
          <Text style={[styles.title, isMobile && styles.titleMobile]}>
            {chapter.title}
          </Text>
        </View>

        {/* Progress pill */}
        <View style={[
          styles.progressPill,
          allDone && styles.progressPillDone,
        ]}>
          <Text style={[
            styles.progressPillText,
            allDone && styles.progressPillTextDone,
          ]}>
            {completedCount}/{total}
          </Text>
        </View>
      </View>

      {/* ── Progress bar ── */}
      <View style={styles.progressTrack}>
        <View
          style={[
            styles.progressFill,
            {
              width: `${progressPct}%` as any,
              backgroundColor: allDone ? "#10b981" : "#6366F1",
            },
          ]}
        />
      </View>

      {/* ── Lesson nodes ── */}
      <LessonTrack lessons={chapter.lessons} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    maxWidth: 860,
    marginBottom: 32,
    alignSelf: "center",
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: "rgba(99,102,241,0.1)",
    ...(Platform.OS === "web"
      ? { boxShadow: "0 4px 24px rgba(99,102,241,0.08)" }
      : {
          shadowColor: "#6366F1",
          shadowOpacity: 0.08,
          shadowRadius: 16,
          shadowOffset: { width: 0, height: 4 },
          elevation: 3,
        }),
  },
  containerMobile: {
    padding: 16,
    borderRadius: 20,
    marginBottom: 20,
  },
  headerCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
  },
  chapterBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#EEF2FF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#C7D2FE",
  },
  chapterBadgeDone: {
    backgroundColor: "#D1FAE5",
    borderColor: "#6EE7B7",
  },
  chapterBadgeText: {
    fontSize: 15,
    fontWeight: "900",
    color: "#4338CA",
  },
  headerText: {
    flex: 1,
  },
  chapterLabel: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1.5,
    textTransform: "uppercase",
    color: "#A5B4FC",
    marginBottom: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    color: "#1E1B4B",
  },
  titleMobile: {
    fontSize: 16,
  },
  progressPill: {
    backgroundColor: "#EEF2FF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#C7D2FE",
  },
  progressPillDone: {
    backgroundColor: "#D1FAE5",
    borderColor: "#6EE7B7",
  },
  progressPillText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#4338CA",
  },
  progressPillTextDone: {
    color: "#059669",
  },
  progressTrack: {
    height: 6,
    backgroundColor: "#EEF2FF",
    borderRadius: 999,
    overflow: "hidden",
    marginBottom: 8,
  },
  progressFill: {
    height: "100%",
    borderRadius: 999,
  },
});

export default ChapterRow;