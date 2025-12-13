import React, { useMemo, useState } from "react";
import { View, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import AppLayout from "../../components/Layout/AppLayout";
import { useTheme } from "../../theme/ThemeProvider";
import FlipCard from "./Flipcard"; // adjust path if needed
import { useXPStore } from "../../store/useXPStore";
import { RootStackParamList } from "../../navigation/navigation";

type Nav = StackNavigationProp<RootStackParamList>;

const FilipinoGreetings: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation<Nav>();

  const addXP = useXPStore((s) => s.addXP);
  const currentXP = useXPStore((s) => s.xp);

  // ⭐ Deck data
  const cards = useMemo(
    () => [
      { front: "Hello", back: "Kamusta" },
      { front: "Good morning", back: "Magandang Umaga" },
      { front: "Good evening", back: "Magandang gabi" },
      { front: "Good afternoon", back: "Magandang hapon" },
      { front: "Goodbye", back: "Paalam" },
      { front: "You", back: "Ikaw" },
    ],
    []
  );

  const [index, setIndex] = useState(0);

  // ✅ XP tuning
  const XP_PER_CARD = 5;
  const XP_DECK_BONUS = 15; // optional “finished deck” bonus

  const next = () => {
    const isLast = index >= cards.length - 1;

    // award XP for completing this card
    addXP(XP_PER_CARD);

    if (!isLast) {
      setIndex(index + 1);
      return;
    }

    // finished the deck — bonus + animate back on FlashHome
    const before = currentXP; // xp before any rewards this press
    addXP(XP_DECK_BONUS);

    const after = useXPStore.getState().xp;

    navigation.navigate("FilipinoFlashHome", {
      animatedStartXP: before,
      animatedEndXP: after,
    });
  };

  const prev = () => {
    if (index > 0) setIndex(index - 1);
  };

  return (
    <AppLayout title="Flashcards — Greetings">
      <Text
        style={[
          theme.typography.body,
          {
            textAlign: "center",
            marginBottom: theme.spacing.lg,
            color: theme.colors.textSecondary,
          },
        ]}
      >
        Tap the card to flip. Hit Next when you’ve learned it.
      </Text>

      {/* Card */}
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <FlipCard front={cards[index].front} back={cards[index].back} />
      </View>

      {/* Controls */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          gap: theme.spacing.md,
          marginBottom: theme.spacing.xl,
        }}
      >
        <Pressable
          onPress={prev}
          disabled={index === 0}
          style={{
            paddingVertical: theme.spacing.md,
            paddingHorizontal: theme.spacing.lg,
            borderRadius: 12,
            backgroundColor: index === 0 ? "#A7C7ED" : theme.colors.secondary,
            opacity: index === 0 ? 0.6 : 1,
          }}
        >
          <Text style={{ color: "white", fontWeight: "700" }}>← Back</Text>
        </Pressable>

        <Pressable
          onPress={next}
          style={{
            paddingVertical: theme.spacing.md,
            paddingHorizontal: theme.spacing.lg,
            borderRadius: 12,
            backgroundColor: theme.colors.primary,
          }}
        >
          <Text style={{ color: "white", fontWeight: "700" }}>
            {index === cards.length - 1 ? "Finish ✓" : "Next →"}
          </Text>
        </Pressable>
      </View>

      {/* Progress */}
      <Text style={{ textAlign: "center", color: theme.colors.textSecondary }}>
        Card {index + 1} / {cards.length}
      </Text>
    </AppLayout>
  );
};

export default FilipinoGreetings;
