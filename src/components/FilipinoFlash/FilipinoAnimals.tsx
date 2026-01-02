import React, { useMemo, useState, useEffect } from "react";
import { View, Text, Pressable } from "react-native";
import { Audio } from "expo-av";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import AppLayout from "../../components/Layout/AppLayout";
import { useTheme } from "../../theme/ThemeProvider";
import FlipCard from "./Flipcard";
import { useXPStore } from "../../store/useXPStore";
import { RootStackParamList } from "../../navigation/navigation";

type Nav = StackNavigationProp<RootStackParamList>;

const FilipinoAnimals: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation<Nav>();

  const addXP = useXPStore((s) => s.addXP);
  const currentXP = useXPStore((s) => s.xp);

  const [index, setIndex] = useState(0);
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  const XP_PER_CARD = 5;
  const XP_DECK_BONUS = 15;

  /* ----------------------------
     FLASHCARD DATA
  ---------------------------- */
  const cards = useMemo(
    () => [
      {
        front: "Cat",
        back: "Pusa",
        soundSrc: require("../../../assets/Voice/pusa.mp3"),
      },
      {
        front: "Dog",
        back: "Aso",
        soundSrc: require("../../../assets/Voice/aso.mp3"),
      },
      {
        front: "Bird",
        back: "Ibon",
        soundSrc: require("../../../assets/Voice/ibon.mp3"),
      },
      {
        front: "Monkey",
        back: "Unggoy",
        soundSrc: require("../../../assets/Voice/unggoy.mp3"),
      },
      {
        front: "Tiger",
        back: "Tigre",
        soundSrc: require("../../../assets/Voice/tigre.mp3"),
      },
      {
        front: "Fish",
        back: "Isda",
        soundSrc: require("../../../assets/Voice/isda.mp3"),
      },
      {
        front: "Lion",
        back: "Leon",
        soundSrc: require("../../../assets/Voice/leon.mp3"),
      },
      {
        front: "Snake",
        back: "Ahas",
        soundSrc: require("../../../assets/Voice/ahas.mp3"),
      },
      {
        front: "Cow",
        back: "Baka",
        soundSrc: require("../../../assets/Voice/baka.mp3"),
      },
      {
        front: "Goat",
        back: "Kambing",
        soundSrc: require("../../../assets/Voice/kambing.mp3"),
      },
      {
        front: "Pig",
        back: "Baboy",
        soundSrc: require("../../../assets/Voice/baboy.mp3"),
      },
    ],
    []
  );

  /* ----------------------------
     AUDIO CLEANUP
  ---------------------------- */
  useEffect(() => {
    return () => {
      sound?.unloadAsync();
    };
  }, [sound]);

  const playSound = async () => {
    try {
      sound?.unloadAsync();
      const { sound: newSound } = await Audio.Sound.createAsync(
        cards[index].soundSrc
      );
      setSound(newSound);
      await newSound.playAsync();
    } catch (e) {
      console.warn("Audio error:", e);
    }
  };

  /* ----------------------------
     NAVIGATION / XP
  ---------------------------- */
  const next = () => {
    const isLast = index >= cards.length - 1;
    addXP(XP_PER_CARD);

    if (!isLast) {
      setIndex(index + 1);
      return;
    }

    const before = currentXP;
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

  /* ----------------------------
     RENDER
  ---------------------------- */
  return (
    <AppLayout title="Flashcards — Animals">
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
        Tap the card to flip. Listen to the pronunciation, then move on.
      </Text>

      {/* CARD */}
     <View
  style={{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }}
>
  <FlipCard front={cards[index].front} back={cards[index].back} />

  <Text
    style={{
      marginTop: theme.spacing.sm,
      fontSize: 13,
      color: theme.colors.textSecondary,
      opacity: 0.8,
    }}
  >
    Tap to reveal Tagalog
  </Text>
</View>


      {/* 🔊 PRONUNCIATION BUTTON */}
      <Pressable
        onPress={playSound}
        style={{
          alignSelf: "center",
          marginVertical: theme.spacing.lg,
          paddingVertical: theme.spacing.md,
          paddingHorizontal: theme.spacing.xl,
          borderRadius: 999,
          backgroundColor: theme.colors.primary,
        }}
      >
        <Text style={{ color: "white", fontWeight: "700", fontSize: 16 }}>
          🔊 Play pronunciation
        </Text>
      </Pressable>

      {/* CONTROLS */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          gap: theme.spacing.md,
          marginBottom: theme.spacing.lg,
        }}
      >
        <Pressable
          onPress={prev}
          disabled={index === 0}
          style={{
            paddingVertical: theme.spacing.md,
            paddingHorizontal: theme.spacing.lg,
            borderRadius: 12,
            backgroundColor:
              index === 0 ? "#A7C7ED" : theme.colors.secondary,
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

      {/* PROGRESS */}
      <Text
        style={{
          textAlign: "center",
          marginBottom: theme.spacing.md,
          color: theme.colors.textSecondary,
        }}
      >
        Card {index + 1} / {cards.length}
      </Text>
    </AppLayout>
  );
};

export default FilipinoAnimals;
