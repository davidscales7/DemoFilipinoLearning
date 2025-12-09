import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Screen } from "../../theme/components";
import { useTheme } from "../../theme/ThemeProvider";
import FlipCard from "./Flipcard";

const FilipinoFlashNumbersBasic = () => {
  const theme = useTheme();

  // ⭐ Flashcard data stored directly inside this page
  const cards = [
    { front: "Isa", back: "One" },
    { front: "Dalawa", back: "Two" },
    { front: "Tatlo", back: "Three" },
    { front: "Apat", back: "Four" },
    { front: "Lima", back: "Five" },
  ];

  const [index, setIndex] = useState(0);

  const next = () => {
    if (index < cards.length - 1) setIndex(index + 1);
  };

  return (
    <View style={{ flex: 1, flexDirection: "row" }}>
      <Sidebar />

      <Screen>
        <Text
          style={[
            theme.typography.title,
            { textAlign: "center", marginBottom: theme.spacing.lg },
          ]}
        >
          Flashcards — Numbers (Basic)
        </Text>

        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FlipCard
            front={cards[index].front}
            back={cards[index].back}
          />
        </View>

        {/* Next Button */}
        <TouchableOpacity
          onPress={next}
          style={{
            backgroundColor: theme.colors.primary,
            padding: theme.spacing.md,
            borderRadius: 12,
            alignSelf: "center",
            marginBottom: theme.spacing.xl,
          }}
        >
          <Text style={{ color: "white", fontWeight: "700" }}>
            Next →
          </Text>
        </TouchableOpacity>
      </Screen>
    </View>
  );
};

export default FilipinoFlashNumbersBasic;
