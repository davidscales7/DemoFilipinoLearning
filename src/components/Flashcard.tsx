// Flashcard.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface FlashcardProps {
  frontText: string;
  backText: string;
  reset: boolean;
  onResetComplete: () => void;
}

const Flashcard: React.FC<FlashcardProps> = ({ frontText, backText, reset, onResetComplete }) => {
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    if (reset) {
      setFlipped(false);
      onResetComplete();
    }
  }, [reset]);

  const handlePress = () => {
    setFlipped(!flipped);
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.cardText}>{flipped ? backText : frontText}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 300,
    height: 200,
    backgroundColor: '#FFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  cardContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    fontSize: 20,
    textAlign: 'center',
    padding: 10,
  },
});

export default Flashcard;
