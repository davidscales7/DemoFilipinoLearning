import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import Flashcard from '../Flashcard';

const Greetings: React.FC = () => {
  const flashcards = [
    {
      front: 'Hello',
      back: 'Kamusta',
      frontImageSrc: require('../../../assets/images/FlagPhilippines.png'),
      backImageSrc: require('../../../assets/images/FlagPhilippines.png'),
      soundSrc: require('../../../assets/Voice/Kamusta.mp3'),
    },
    {
      front: 'Good morning',
      back: 'Magandang Hapon',
      frontImageSrc: require('../../../assets/images/FlagPhilippines.png'),
      backImageSrc: require('../../../assets/images/FlagPhilippines.png'),
      soundSrc: require('../../../assets/Voice/MagandangHapon.mp3'),
    },
    {
      front: 'Good evening',
      back: 'Magandang gabi',
      frontImageSrc: require('../../../assets/images/FlagPhilippines.png'),
      backImageSrc: require('../../../assets/images/FlagPhilippines.png'),
      soundSrc: require('../../../assets/Voice/MagandangGabi.mp3'),
    },
    {
      front: 'Good afternoon',
      back: 'Magandang hapon',
      frontImageSrc: require('../../../assets/images/FlagPhilippines.png'),
      backImageSrc: require('../../../assets/images/FlagPhilippines.png'),
      soundSrc: require('../../../assets/Voice/MagandangHapon.mp3'),
    },
    {
      front: 'Goodbye',
      back: 'Paalam',
      frontImageSrc: require('../../../assets/images/FlagPhilippines.png'),
      backImageSrc: require('../../../assets/images/FlagPhilippines.png'),
      soundSrc: require('../../../assets/Voice/Paalam.mp3'),
    },
    {
      front: 'You',
      back: 'Ikaw',
      frontImageSrc: require('../../../assets/images/FlagPhilippines.png'),
      backImageSrc: require('../../../assets/images/FlagPhilippines.png'),
      soundSrc: require('../../../assets/Voice/ikaw.mp3'),
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

export default Greetings;
