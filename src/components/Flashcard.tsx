import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

interface FlashcardProps {
  frontText: string;
  backText: string;
  frontImageSrc?: any;
  backImageSrc?: any;
  reset: boolean;
  onResetComplete: () => void;
}

const Flashcard: React.FC<FlashcardProps> = ({ frontText, backText, frontImageSrc, backImageSrc, reset, onResetComplete }) => {
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
        {flipped ? (
          <>
            {backImageSrc && <Image source={backImageSrc} style={styles.cardImage} />}
            <Text style={styles.cardText}>{backText}</Text>
          </>
        ) : (
          <>
            {frontImageSrc && <Image source={frontImageSrc} style={styles.cardImage} />}
            <Text style={styles.cardText}>{frontText}</Text>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 300,
    height: 300,  // Increased height to accommodate image
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
  },
  cardImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
});

export default Flashcard;
