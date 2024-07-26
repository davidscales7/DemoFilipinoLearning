// FilipinoGreetingsScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import Flashcard from '../Flashcard';

const FilipinoBodyparts: React.FC = () => {
  const flashcards = [
    {
      front: 'Eye',
      back: 'Mata',
      frontImageSrc: require('../../../assets/images/FlagPhilippines.png'),
 
      backImageSrc: require('../../../assets/images/FlagPhilippines.png'),
    },

    {
      front: 'Eyes',
      back: 'Mga mata',
      frontImageSrc: require('../../../assets/images/FlagPhilippines.png'),
      backImageSrc: require('../../../assets/images/FlagPhilippines.png'),
    },

    {
      front: 'Nose',
      back: 'Ilong',
      frontImageSrc: require('../../../assets/images/FlagPhilippines.png'),
      backImageSrc: require('../../../assets/images/FlagPhilippines.png'),
    },
    {
      front: 'Ears',
      back: 'Tainga',
      frontImageSrc: require('../../../assets/images/FlagPhilippines.png'),
      backImageSrc: require('../../../assets/images/FlagPhilippines.png'),
    },
    {
      front: 'Finger',
      back: 'Daliri',
      frontImageSrc: require('../../../assets/images/FlagPhilippines.png'),
      backImageSrc: require('../../../assets/images/FlagPhilippines.png'),
    },
    {
        front: 'Hand',
        back: 'Kamay',
        frontImageSrc: require('../../../assets/images/FlagPhilippines.png'),
        backImageSrc: require('../../../assets/images/FlagPhilippines.png'),
      },
      {
        front: 'Feet',
        back: 'Paa',
        frontImageSrc: require('../../../assets/images/FlagPhilippines.png'),
        backImageSrc: require('../../../assets/images/FlagPhilippines.png'),
      },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [reset, setReset] = useState(false);

  const handleCorrect = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
    setReset(true);
  };

  const handleIncorrect = () => {
    setReset(true);
  };

  const handleResetComplete = () => {
    setReset(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Filipino Greetings</Text>
      <Flashcard
        frontText={flashcards[currentIndex].front}
        backText={flashcards[currentIndex].back}
        frontImageSrc={flashcards[currentIndex].frontImageSrc}
        backImageSrc={flashcards[currentIndex].backImageSrc}
        reset={reset}
        onResetComplete={handleResetComplete}
      />
      <View style={styles.buttonContainer}>
        <Button title="Correct" onPress={handleCorrect} color="green" />
        <Button title="Incorrect" onPress={handleIncorrect} color="red" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    margin: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    marginTop: 20,
  },
});

export default FilipinoBodyparts;
