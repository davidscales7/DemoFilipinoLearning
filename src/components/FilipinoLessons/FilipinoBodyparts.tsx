import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import Flashcard from '../Flashcard';

const FilipinoBodyparts: React.FC = () => {
  const flashcards = [
    {
      front: 'Eye',
      back: 'Mata',
      frontImageSrc: require('../../../assets/images/FlagPhilippines.png'),
      backImageSrc: require('../../../assets/images/eye.jpg'),
      soundSrc: require('../../../assets/Voice/Mata.mp3'),
    },
    {
      front: 'Eyes',
      back: 'Mga Mata',
      frontImageSrc: require('../../../assets/images/FlagPhilippines.png'),
      backImageSrc: require('../../../assets/images/eyes.jpg'),
      soundSrc: require('../../../assets/Voice/MgaMata.mp3'),
    },
    {
      front: 'Nose',
      back: 'Ilong',
      frontImageSrc: require('../../../assets/images/FlagPhilippines.png'),
      backImageSrc: require('../../../assets/images/nose.jpg'),
      soundSrc: require('../../../assets/Voice/Ilong.mp3'),
    },
    {
      front: 'Ears',
      back: 'Tainga',
      frontImageSrc: require('../../../assets/images/FlagPhilippines.png'),
      backImageSrc: require('../../../assets/images/ears.jpg'),
      soundSrc: require('../../../assets/Voice/Tainga.mp3'),
    },
    {
      front: 'Finger',
      back: 'Daliri',
      frontImageSrc: require('../../../assets/images/FlagPhilippines.png'),
      backImageSrc: require('../../../assets/images/finger.png'),
      soundSrc: require('../../../assets/Voice/Daliri.mp3'),
    },
    {
      front: 'Hand',
      back: 'Kamay',
      frontImageSrc: require('../../../assets/images/FlagPhilippines.png'),
      backImageSrc: require('../../../assets/images/hand.jpg'),
      soundSrc: require('../../../assets/Voice/Kamay.mp3'),
    },
    {
      front: 'Feet',
      back: 'Paa',
      frontImageSrc: require('../../../assets/images/FlagPhilippines.png'),
      backImageSrc: require('../../../assets/images/feet.jpg'),
      soundSrc: require('../../../assets/Voice/Paa.mp3'),
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
      <Text style={styles.title}>Filipino Body Parts</Text>
      <Flashcard
        frontText={flashcards[currentIndex].front}
        backText={flashcards[currentIndex].back}
        frontImageSrc={flashcards[currentIndex].frontImageSrc}
        backImageSrc={flashcards[currentIndex].backImageSrc}
        soundSrc={flashcards[currentIndex].soundSrc}
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
