// components/Quizzes/QuizPath.tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import Svg, { Line } from "react-native-svg";
import { useTheme } from "../../theme/ThemeProvider";
import QuizNode, { QuizNodeProps } from "./QuizNode";

interface QuizPathProps {
  quizzes: QuizNodeProps[]; // 👈 use the same shape as QuizNode
}

const QuizPath: React.FC<QuizPathProps> = ({ quizzes }) => {
  const { colors } = useTheme();

  if (!quizzes || quizzes.length === 0) {
    console.warn("QuizPath requires at least one quiz.");
    return null;
  }

  const nodeSize = 80;
  const gapX = 150;
  const paddingH = 40;
  const row1Y = 30;
  const row2Y = 150;

  const totalWidth =
    paddingH * 2 + gapX * (quizzes.length - 1) + nodeSize;

  const positions = quizzes.map((_, index) => {
    const x = paddingH + index * gapX;
    const y = index % 2 === 0 ? row1Y : row2Y;
    return { x, y };
  });

  const connections: [number, number][] = [];
  for (let i = 0; i < quizzes.length - 1; i++) {
    connections.push([i, i + 1]);
  }

  const svgHeight = row2Y + nodeSize + 40;

  return (
    <View style={[styles.container, { width: totalWidth, height: svgHeight }]}>
      <Svg
        width={totalWidth}
        height={svgHeight}
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
      >
        {connections.map(([from, to], index) => (
          <Line
            key={index}
            x1={positions[from].x + nodeSize / 2}
            y1={positions[from].y + nodeSize / 2}
            x2={positions[to].x + nodeSize / 2}
            y2={positions[to].y + nodeSize / 2}
            stroke={colors.border}
            strokeWidth={3}
            strokeLinecap="round"
          />
        ))}
      </Svg>

      {quizzes.map((quiz, index) => (
        <View
          key={index}
          style={{
            position: "absolute",
            left: positions[index].x,
            top: positions[index].y,
          }}
        >
          <QuizNode {...quiz} />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // width and height are set dynamically
  },
});

export default QuizPath;
