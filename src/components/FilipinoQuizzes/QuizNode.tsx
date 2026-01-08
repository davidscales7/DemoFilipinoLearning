// components/Quizzes/QuizNode.tsx
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
        toValue: 0.9,
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
              backgroundColor: locked ? colors.card : color,
              transform: [{ scale }],
              opacity: locked ? 0.6 : 1,
            },
          ]}
        >
          <MaterialCommunityIcons
            name={locked ? ("lock" as any) : (icon as any)}
            size={28}
            color={locked ? colors.textSecondary : "#FFFFFF"}
          />
        </Animated.View>
      </Pressable>

      <Text
        style={[
          typography.body,
          { marginTop: 8, textAlign: "center" },
          locked && { color: colors.textSecondary },
        ]}
      >
        {title}
      </Text>
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
},

});

export default QuizNode;
