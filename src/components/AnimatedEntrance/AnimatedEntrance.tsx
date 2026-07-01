import React from "react";
import { ViewStyle } from "react-native";
import Animated, {
  FadeInDown,
  FadeInUp,
  FadeIn,
} from "react-native-reanimated";

/*
  Reusable entrance animations built on Reanimated.
  Drop these around any content to get consistent, polished reveals.

  <FadeInBanner>        → top banners / headers (fade + slide down)
  <StaggerItem index={i}> → list/grid items (fade + slide up, staggered)
  <SoftFadeIn>          → images or secondary content (gentle fade)
*/

const BASE_DELAY = 100;   // ms before anything starts
const STAGGER_GAP = 110;  // ms between each staggered item

type WrapProps = {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
  /** extra delay in ms on top of the default */
  delay?: number;
};

/* Top banner / header — slides down from above */
export const FadeInBanner: React.FC<WrapProps> = ({ children, style, delay = 0 }) => (
  <Animated.View
    entering={FadeInDown.duration(600).delay(BASE_DELAY + delay).springify().damping(18)}
    style={style}
  >
    {children}
  </Animated.View>
);

/* Grid / list item — slides up, staggered by index */
type StaggerProps = WrapProps & { index: number };

export const StaggerItem: React.FC<StaggerProps> = ({ children, style, index, delay = 0 }) => (
  <Animated.View
    entering={FadeInUp
      .duration(500)
      .delay(BASE_DELAY + delay + index * STAGGER_GAP)
      .springify()
      .damping(16)}
    style={style}
  >
    {children}
  </Animated.View>
);

/* Gentle fade — good for images or supporting content */
export const SoftFadeIn: React.FC<WrapProps> = ({ children, style, delay = 0 }) => (
  <Animated.View
    entering={FadeIn.duration(800).delay(BASE_DELAY + delay)}
    style={style}
  >
    {children}
  </Animated.View>
);