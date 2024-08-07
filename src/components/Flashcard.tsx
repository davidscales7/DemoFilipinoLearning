import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Button } from 'react-native';
import { Audio } from 'expo-av';

interface FlashcardProps {
  frontText: string;
  backText: string;
  frontImageSrc: any;
  backImageSrc: any;
  soundSrc: any;  // Add the soundSrc prop
  reset: boolean;
  onResetComplete: () => void;
}

const Flashcard: React.FC<FlashcardProps> = ({
  frontText,
  backText,
  frontImageSrc,
  backImageSrc,
  soundSrc,  // Destructure the soundSrc prop
  reset,
  onResetComplete,
}) => {
  const [flipped, setFlipped] = useState(false);
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  useEffect(() => {
    if (reset) {
      setFlipped(false);
      onResetComplete();
    }
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [reset]);

  const handlePress = () => {
    setFlipped(!flipped);
  };

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(soundSrc);
    setSound(sound);
    await sound.playAsync();
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.card}>
      <View style={styles.cardContent}>
        {flipped ? (
          <>
            <Text style={styles.cardText}>{backText}</Text>
            {backImageSrc && <Image source={backImageSrc} style={styles.image} />}
            <Button title="Play Sound" onPress={playSound} />
          </>
        ) : (
          <>
            <Text style={styles.cardText}>{frontText}</Text>
            {frontImageSrc && <Image source={frontImageSrc} style={styles.image} />}
          </>
        )}
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
  image: {
    width: 100,
    height: 100,
    marginTop: 10,
  },
});

export default Flashcard;
