import React, { useState, useRef } from "react";
import { View, Pressable, Text, Animated } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";

const CARD_HEIGHT = 220;
const CARD_WIDTH = "80%";

const FlipCard = ({ front, back }) => {
  const theme = useTheme();
  const [flipped, setFlipped] = useState(false);
  const rotate = useRef(new Animated.Value(0)).current;

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

  const faceStyle: any = {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backfaceVisibility: "hidden",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  };

  return (
    // ✅ THIS is the key fix: normal-flow container
    <View
      style={{
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
      }}
    >
      {/* FRONT */}
      <Animated.View
        style={[
          faceStyle,
          {
            backgroundColor: theme.colors.card,
            transform: [{ rotateY: frontInterpolate }],
          },
        ]}
      >
        <Pressable
          onPress={flip}
          style={{
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={theme.typography.title}>{front}</Text>
        </Pressable>
      </Animated.View>

      {/* BACK */}
      <Animated.View
        style={[
          faceStyle,
          {
            backgroundColor: theme.colors.accent,
            transform: [{ rotateY: backInterpolate }],
          },
        ]}
      >
        <Pressable
          onPress={flip}
          style={{
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={[
              theme.typography.title,
              { color: theme.colors.textLight },
            ]}
          >
            {back}
          </Text>
        </Pressable>
      </Animated.View>
    </View>
  );
};

export default FlipCard;
