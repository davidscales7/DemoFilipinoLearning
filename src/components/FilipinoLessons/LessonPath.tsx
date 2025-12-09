import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import LessonNode from "./LessonNode";
import Svg, { Line } from "react-native-svg";
import { useTheme } from "../../theme/ThemeProvider";

const LessonPath = ({ lessons }) => {
  const { colors } = useTheme();

  if (!lessons || lessons.length < 10) {
    console.warn("LessonPath requires exactly 10 lessons.");
    return null;
  }

  const screenWidth = Dimensions.get("window").width;
  const centerX = screenWidth / 2 - 40; // Centers the nodes

  // Relative positioning (clean, centered)
  const positions = [
    { x: centerX - 100, y: 40 },   // L1
    { x: centerX + 100, y: 40 },   // L2
    { x: centerX,       y: 160 },  // L3

    { x: centerX - 100, y: 280 },  // L4
    { x: centerX + 100, y: 280 },  // L5
    { x: centerX,       y: 400 },  // L6

    { x: centerX - 100, y: 520 },  // L7
    { x: centerX + 100, y: 520 },  // L8
    { x: centerX,       y: 640 },  // L9

    { x: centerX,       y: 780 },  // L10
  ];

  // Connection pairs for the tree
  const connections = [
    [0,1], [0,2],
    [2,3], [2,4],
    [4,5],
    [5,6], [5,7],
    [7,8],
    [8,9]
  ];

  return (
    <View style={styles.container}>
      {/* SVG Lines */}
      <Svg height="900" width={screenWidth} style={StyleSheet.absoluteFill}>
        {connections.map(([from, to], index) => (
          <Line
            key={index}
            x1={positions[from].x + 40}
            y1={positions[from].y + 40}
            x2={positions[to].x + 40}
            y2={positions[to].y + 40}
            stroke={colors.border}
            strokeWidth="3"
            strokeLinecap="round"
          />
        ))}
      </Svg>

      {/* Nodes */}
      {lessons.map((lesson, index) => (
        <View
          key={index}
          style={{
            position: "absolute",
            left: positions[index].x,
            top: positions[index].y,
          }}
        >
          <LessonNode {...lesson} />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 950,
    width: "100%",
  },
});

export default LessonPath;
