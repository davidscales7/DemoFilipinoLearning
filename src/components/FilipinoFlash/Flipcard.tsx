import React, { useState } from "react";
import { Pressable, Text, Animated } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";

const FlipCard = ({ front, back }) => {
  const theme = useTheme();
  const [flipped, setFlipped] = useState(false);
  const rotate = useState(new Animated.Value(0))[0];

  const flip = () => {
    Animated.timing(rotate, {
      toValue: flipped ? 0 : 1,
      duration: 250,
      useNativeDriver: true,
    }).start();
    setFlipped(!flipped);
  };

  const frontInterpolate = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  const backInterpolate = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ["180deg", "360deg"],
  });

  const baseStyle: any = {
    width: "80%",
    height: 220,
    borderRadius: 20,
    backgroundColor: theme.colors.card,
    justifyContent: "center",
    alignItems: "center",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
    position: "absolute",
    backfaceVisibility: "hidden" as const,
  };

  return (
    <>
      {/* FRONT CARD */}
      <Animated.View
        style={[baseStyle, { transform: [{ rotateY: frontInterpolate }] }]}
      >
        <Pressable
          onPress={flip}
          style={{ width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }}
        >
          <Text style={[theme.typography.title]}>{front}</Text>
        </Pressable>
      </Animated.View>

      {/* BACK CARD */}
      <Animated.View
        style={[
          baseStyle,
          {
            transform: [{ rotateY: backInterpolate }],
            backgroundColor: theme.colors.accent,
          },
        ]}
      >
        <Pressable
          onPress={flip}
          style={{ width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }}
        >
          <Text style={[theme.typography.title, { color: theme.colors.textLight }]}>
            {back}
          </Text>
        </Pressable>
      </Animated.View>
    </>
  );
};

export default FlipCard;
