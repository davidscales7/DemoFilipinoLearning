import React, { useRef } from "react";
import { Pressable, View, Text, StyleSheet, Animated } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../../theme/ThemeProvider";

export interface QuizNodeProps {
  icon: string;
  title: string;
  color: string;
  locked?: boolean;
  onPress?: () => void;
}

const QuizNode: React.FC<QuizNodeProps> = ({
  icon,
  title,
  color,
  locked = false,
  onPress,
}) => {
  const { colors, typography } = useTheme();
  const scale = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    if (locked || !onPress) return;
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onPress();
    });
  };

  return (
    <View style={{ alignItems: "center" }}>
      <Pressable onPress={handlePress} disabled={locked}>
        <Animated.View
          style={[
            styles.circle,
            {
              backgroundColor: locked ? "#f3f4f6" : color,
              borderColor: locked ? "#d1d5db" : color,
              transform: [{ scale }],
              opacity: locked ? 0.5 : 1,
            },
          ]}
        >
          <MaterialCommunityIcons
            name={locked ? ("lock" as any) : (icon as any)}
            size={28}
            color={locked ? "#9ca3af" : "#FFFFFF"}
          />
        </Animated.View>
      </Pressable>

      <Text
        style={[
          typography.body,
          styles.nodeLabel,
          { color: locked ? "#9ca3af" : colors.textPrimary },
        ]}
      >
        {title}
      </Text>

      {locked && (
        <Text style={styles.lockedText}>Complete lesson first</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  circle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  nodeLabel: {
    marginTop: 8,
    textAlign: "center",
    fontWeight: "500",
  },
  lockedText: {
    marginTop: 4,
    fontSize: 11,
    color: "#9ca3af",
    textAlign: "center",
  },
});

export default QuizNode;