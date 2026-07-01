import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  useWindowDimensions,
} from "react-native";
import { useTheme } from "../../theme/ThemeProvider";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/navigation";
import { useXPStore } from "../../store/useXPStore";
type Nav = StackNavigationProp<RootStackParamList>;

const Onboarding: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation<Nav>();
  const { width } = useWindowDimensions();
  const addXP = useXPStore((s) => s.addXP);
  const isMobile = width < 768;

  const handleGetStarted = () => {
    addXP(1);
    navigation.navigate("FilipinoLearning" as any);
  };

  const testimonials = [
    { avatar: "👩", name: "Maria", text: "5K+ learners" },
    { avatar: "👨", name: "Alex", text: "1000+ words" },
    { avatar: "👩‍🦱", name: "Sam", text: "10 min/day" },
  ];

  const features = [
    { emoji: "📖", label: "Lessons" },
    { emoji: "🧠", label: "Quizzes" },
    { emoji: "🎴", label: "Flashcards" },
    { emoji: "🏆", label: "Accolades" },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.primary }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* MAIN CARD */}
        <View
          style={[
            styles.mainCard,
            {
              backgroundColor: theme.colors.background,
              borderLeftColor: theme.colors.primary,
            },
          ]}
        >
          <View style={isMobile ? styles.mobileLayout : styles.desktopLayout}>
            {/* LEFT SIDE - CONTENT */}
            <View style={styles.contentSide}>
              <Text style={[styles.tagline, { color: theme.colors.textSecondary }]}>
                🇵🇭 WELCOME
              </Text>

              <Text style={[styles.heroTitle, { color: theme.colors.textPrimary }]}>
                Speak Tagalog in{" "}
                <Text style={{ color: theme.colors.primary }}>weeks</Text>, not
                years.
              </Text>

              <Text
                style={[
                  styles.description,
                  { color: theme.colors.textSecondary },
                ]}
              >
                Master Filipino through bite-sized lessons, smart quizzes, spaced repetition flashcards, and real badges. Five minutes a day is all you need.
              </Text>

              {/* FEATURES ICONS */}
              <View style={styles.featuresRow}>
                {features.map((feature, idx) => (
                  <View key={idx} style={styles.featureIcon}>
                    <Text style={styles.featureEmoji}>{feature.emoji}</Text>
                    <Text
                      style={[
                        styles.featureLabel,
                        { color: theme.colors.textSecondary },
                      ]}
                    >
                      {feature.label}
                    </Text>
                  </View>
                ))}
              </View>

              {/* CTA BUTTON */}
              <TouchableOpacity
                style={[
                  styles.ctaButton,
                  { backgroundColor: theme.colors.primary },
                ]}
                onPress={handleGetStarted}
              >
                <Text style={styles.ctaButtonText}>Get Started Free</Text>
                <Text style={styles.ctaArrow}>→</Text>
              </TouchableOpacity>

              {/* SOCIAL PROOF */}
              <View style={styles.socialProof}>
                <View style={styles.avatarsGroup}>
                  {testimonials.map((testimonial, idx) => (
                    <View
                      key={idx}
                      style={[
                        styles.avatar,
                        {
                          backgroundColor: theme.colors.card,
                          marginLeft: idx > 0 ? -12 : 0,
                          zIndex: testimonials.length - idx,
                        },
                      ]}
                    >
                      <Text style={styles.avatarEmoji}>
                        {testimonial.avatar}
                      </Text>
                    </View>
                  ))}
                </View>
                <Text
                  style={[
                    styles.socialProofText,
                    { color: theme.colors.textSecondary },
                  ]}
                >
                  Join 5K+ learners already speaking Tagalog
                </Text>
              </View>
            </View>

            {/* RIGHT SIDE - CHARACTER/IMAGE */}
            {!isMobile && (
              <View style={styles.characterSide}>
                <View style={styles.imageContainer}>
                  <Image
                    source={require("../../../assets/images/hello.png")}
                    style={styles.image}
                    resizeMode="contain"
                  />
                </View>

                {/* FLOATING BADGES */}
                <View
                  style={[
                    styles.badge,
                    styles.badgeTop,
                    {
                      backgroundColor: "#FF6B6B",
                    },
                  ]}
                >
                  <Text style={styles.badgeText}>Online</Text>
                </View>

                <View
                  style={[
                    styles.badge,
                    styles.badgeRight,
                    {
                      backgroundColor: "#4ECDC4",
                    },
                  ]}
                >
                  <Text style={styles.badgeText}>+50 XP</Text>
                </View>

                <View
                  style={[
                    styles.badge,
                    styles.badgeBottom,
                    {
                      backgroundColor: "#FFC956",
                    },
                  ]}
                >
                  <Text style={styles.badgeText}>🏆 Streak!</Text>
                </View>
              </View>
            )}
          </View>
        </View>

        {/* BOTTOM STATS CARDS */}
        <View style={styles.statsContainer}>
          <View
            style={[
              styles.statCard,
              {
                backgroundColor: theme.colors.card,
                borderLeftColor: "#6366F1",
              },
            ]}
          >
            <Text style={[styles.statNumber, { color: theme.colors.primary }]}>
              1000+
            </Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
              Words & Phrases
            </Text>
          </View>

          <View
            style={[
              styles.statCard,
              {
                backgroundColor: theme.colors.card,
                borderLeftColor: "#FF6B6B",
              },
            ]}
          >
            <Text style={[styles.statNumber, { color: theme.colors.primary }]}>
              30+
            </Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
              Lessons & Quizzes
            </Text>
          </View>

          <View
            style={[
              styles.statCard,
              {
                backgroundColor: theme.colors.card,
                borderLeftColor: "#10B981",
              },
            ]}
          >
            <Text style={[styles.statNumber, { color: theme.colors.primary }]}>
              100%
            </Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
              No Ads
            </Text>
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  mainCard: {
    borderRadius: 20,
    padding: 32,
    borderLeftWidth: 6,
    marginBottom: 20,
  },
  desktopLayout: {
    flexDirection: "row",
    gap: 40,
    alignItems: "center",
  },
  mobileLayout: {
    flexDirection: "column",
  },
  contentSide: {
    flex: 1,
  },
  characterSide: {
    flex: 1,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: "100%",
    height: 320,
    borderRadius: 16,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  tagline: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
    marginBottom: 12,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: "900",
    lineHeight: 40,
    marginBottom: 16,
  },
  description: {
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 24,
  },
  featuresRow: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 28,
  },
  featureIcon: {
    alignItems: "center",
    gap: 6,
  },
  featureEmoji: {
    fontSize: 24,
  },
  featureLabel: {
    fontSize: 11,
    fontWeight: "600",
  },
  ctaButton: {
    flexDirection: "row",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  ctaButtonText: {
    color: "white",
    fontWeight: "800",
    fontSize: 16,
  },
  ctaArrow: {
    color: "white",
    fontSize: 18,
    fontWeight: "800",
  },
  socialProof: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatarsGroup: {
    flexDirection: "row",
    height: 40,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "white",
  },
  avatarEmoji: {
    fontSize: 18,
  },
  socialProofText: {
    fontSize: 12,
    fontWeight: "600",
    maxWidth: 140,
  },
  badge: {
    position: "absolute",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontWeight: "800",
    fontSize: 12,
  },
  badgeTop: {
    top: -10,
    right: 20,
  },
  badgeRight: {
    right: -20,
    top: "50%",
  },
  badgeBottom: {
    bottom: -10,
    left: -20,
  },
  statsContainer: {
    flexDirection: "row",
    gap: 12,
  },
  statCard: {
    flex: 1,
    borderRadius: 14,
    padding: 16,
    borderLeftWidth: 5,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "900",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    fontWeight: "600",
    lineHeight: 14,
  },
});

export default Onboarding;