// src/screens/FilipinoFlashcards/FlashcardLogic.tsx
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Pressable } from "react-native";
import { Audio } from "expo-av";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import AppLayout from "../Layout/AppLayout";
import FlashcardLayout from "./FlashcardLayout";
import FlipCard from "./Flipcard"; // Your existing FlipCard component
import { useXPStore } from "../../store/useXPStore";
import { useProgressStore } from "../../store/useProgressStore";
import { useAccoladeStore } from "../../store/useAccoladeStore";
import { useTheme } from "../../theme/ThemeProvider";
import { FlashcardSetData } from "./FlashcardData";
import { RootStackParamList } from "../../navigation/navigation";

type Nav = StackNavigationProp<RootStackParamList>;

type FlashcardLogicProps = {
  flashcardData: FlashcardSetData;
};

const FlashcardLogic: React.FC<FlashcardLogicProps> = ({ flashcardData }) => {
  const navigation = useNavigation<Nav>();
  const theme = useTheme();

  const [currentCard, setCurrentCard] = useState(0);
  const [page, setPage] = useState<"flashcards" | "summary">("flashcards");
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  const addXP = useXPStore((s) => s.addXP);
  const completeFlashcard = useProgressStore((s) => s.completeFlashcard);
  const unlockAccolade = useAccoladeStore((s) => s.unlockAccolade);
  const unlockedAccolades = useAccoladeStore((s) => s.unlocked);

  const { id, title, accoladeKey, xpReward, xpPerCard, cards } = flashcardData;

  // Audio cleanup
  useEffect(() => {
    return () => {
      sound?.unloadAsync();
    };
  }, [sound]);

  const playSound = async () => {
    const card = cards[currentCard];
    if (!card.soundSrc) return;

    try {
      await sound?.unloadAsync();
      const { sound: newSound } = await Audio.Sound.createAsync(card.soundSrc);
      setSound(newSound);
      await newSound.playAsync();
    } catch (e) {
      console.warn("Audio error:", e);
    }
  };

  const handleNext = () => {
    // Award XP for viewing this card
    addXP(xpPerCard);

    if (currentCard < cards.length - 1) {
      setCurrentCard(currentCard + 1);
    } else {
      // Completed all cards - go to summary
      setPage("summary");
    }
  };

  const handlePrevious = () => {
    if (currentCard > 0) {
      setCurrentCard(currentCard - 1);
    }
  };

  /* ----------------------------------------
     UNLOCK ACCOLADE ON SUMMARY
  ---------------------------------------- */
  useEffect(() => {
    if (page !== "summary") return;

    completeFlashcard(id);
    addXP(xpReward); // Completion bonus
    unlockAccolade(accoladeKey);
  }, [page, id, xpReward, accoladeKey, addXP, completeFlashcard, unlockAccolade]);

  const handleFinish = () => {
    navigation.goBack();
  };

  /* ----------------------------------------
     SUMMARY SCREEN
  ---------------------------------------- */
  if (page === "summary") {
    return (
      <AppLayout title={title}>
        <FlashcardLayout setNumber={id} mode="summary">
          <View style={styles.summaryContainer}>
            <Text style={styles.summaryTitle}>🎉 Flashcard Set Complete!</Text>
            
            <View style={styles.accoladeCard}>
              <Text style={styles.accoladeIcon}>{accoladeKey.icon}</Text>
              <Text style={styles.accoladeTitle}>{accoladeKey.title}</Text>
              <Text style={styles.accoladeDescription}>
                {accoladeKey.description}
              </Text>
            </View>

            <View style={styles.statsContainer}>
              <Text style={styles.statsText}>
                ✨ You earned +{xpReward + (xpPerCard * cards.length)} XP total
              </Text>
              <Text style={styles.statsText}>
                🃏 Cards reviewed: {cards.length}
              </Text>
              <Text style={styles.statsText}>
                🏆 Total accolades: {unlockedAccolades.length}
              </Text>
            </View>

            <TouchableOpacity style={styles.finishButton} onPress={handleFinish}>
              <Text style={styles.finishButtonText}>Back to Flashcards</Text>
            </TouchableOpacity>
          </View>
        </FlashcardLayout>
      </AppLayout>
    );
  }

  /* ----------------------------------------
     FLASHCARD SCREEN
  ---------------------------------------- */
  const card = cards[currentCard];

  return (
    <AppLayout title={title}>
      <FlashcardLayout 
        setNumber={id} 
        mode="flashcards" 
        step={currentCard + 1} 
        total={cards.length}
      >
        <View style={styles.container}>
          <Text style={[theme.typography.body, styles.instructions]}>
            Tap the card to flip. Learn the translation!
          </Text>

          {/* CARD */}
          <View style={styles.cardContainer}>
            <FlipCard front={card.front} back={card.back} />
            
            <Text style={styles.tapHint}>
              Tap to reveal Tagalog
            </Text>
          </View>

          {/* AUDIO BUTTON (if available) */}
          {card.soundSrc && (
            <Pressable onPress={playSound} style={styles.audioButton}>
              <Text style={styles.audioButtonText}>🔊 Play pronunciation</Text>
            </Pressable>
          )}

          {/* NAVIGATION BUTTONS */}
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.navButton, styles.prevButton, currentCard === 0 && styles.navButtonDisabled]}
              onPress={handlePrevious}
              disabled={currentCard === 0}
            >
              <Text style={styles.navButtonText}>← Back</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.navButton, styles.nextButton]}
              onPress={handleNext}
            >
              <Text style={styles.navButtonText}>
                {currentCard === cards.length - 1 ? "Finish ✓" : "Next →"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </FlashcardLayout>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  instructions: {
    textAlign: "center",
    marginBottom: 20,
    color: "#6B7280",
  },
  cardContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  tapHint: {
    marginTop: 12,
    fontSize: 13,
    color: "#9CA3AF",
    opacity: 0.8,
  },
  audioButton: {
    alignSelf: "center",
    marginVertical: 20,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 999,
    backgroundColor: "#8B5CF6",
  },
  audioButtonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
    marginBottom: 20,
  },
  navButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  prevButton: {
    backgroundColor: "#6366F1",
  },
  nextButton: {
    backgroundColor: "#8B5CF6",
  },
  navButtonDisabled: {
    backgroundColor: "#D1D5DB",
  },
  navButtonText: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 16,
  },
  // Summary screen styles
  summaryContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  summaryTitle: {
    fontSize: 32,
    fontWeight: "900",
    marginBottom: 24,
    textAlign: "center",
  },
  accoladeCard: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    marginBottom: 24,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
    width: "100%",
    maxWidth: 400,
  },
  accoladeIcon: {
    fontSize: 64,
    marginBottom: 12,
  },
  accoladeTitle: {
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 8,
    textAlign: "center",
  },
  accoladeDescription: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  statsContainer: {
    marginBottom: 24,
    alignItems: "center",
  },
  statsText: {
    fontSize: 16,
    marginVertical: 4,
    color: "#333",
  },
  finishButton: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    backgroundColor: "#8B5CF6",
    borderRadius: 14,
  },
  finishButtonText: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 16,
  },
});

export default FlashcardLogic;