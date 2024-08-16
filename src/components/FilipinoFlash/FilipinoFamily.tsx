import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import Flashcard from '../Flashcard';

const FilipinoFamily: React.FC = () => { // Consider renaming this component to better reflect the content
  const flashcards = [
    {
      front: 'Sister',
      back: 'Ate',
      frontImageSrc: require('../../../assets/images/FlagPhilippines.png'),
      backImageSrc: require('../../../assets/images/sister.png'),
      soundSrc: require('../../../assets/Voice/Ate.mp3'),
    },
    {
      front: 'Brother',
      back: 'Kuya',
      frontImageSrc: require('../../../assets/images/FlagPhilippines.png'),
      backImageSrc: require('../../../assets/images/brother.png'),
      soundSrc: require('../../../assets/Voice/kuya.mp3'),
    },
    {
      front: 'Father',
      back: 'Papa/Tatay',
      frontImageSrc: require('../../../assets/images/FlagPhilippines.png'),
      backImageSrc: require('../../../assets/images/father.png'),
      soundSrc: require('../../../assets/Voice/Papa-tatay.mp3'),
    },
    {
      front: 'Mother',
      back: 'Mama/Nanay',
      frontImageSrc: require('../../../assets/images/FlagPhilippines.png'),
      backImageSrc: require('../../../assets/images/mother.png'),
      soundSrc: require('../../../assets/Voice/Mama-Nanay.mp3'),
    },
    {
      front: 'Cousin',
      back: 'Pinsan',
      frontImageSrc: require('../../../assets/images/FlagPhilippines.png'),
      backImageSrc: require('../../../assets/images/cousin.png'),
      soundSrc: require('../../../assets/Voice/pinsan.mp3'),
    },
    {
      front: 'Sibling',
      back: 'Kapatid',
      frontImageSrc: require('../../../assets/images/FlagPhilippines.png'),
      backImageSrc: require('../../../assets/images/sibling.png'),
      soundSrc: require('../../../assets/Voice/kapatid.mp3'),
    },
    {
      front: 'Grandad',
      back: 'Lolo',
      frontImageSrc: require('../../../assets/images/FlagPhilippines.png'),
      backImageSrc: require('../../../assets/images/grandad.png'),
      soundSrc: require('../../../assets/Voice/Lolo.mp3'),
    },
    {
      front: 'Grandma',
      back: 'Lola',
      frontImageSrc: require('../../../assets/images/FlagPhilippines.png'),
      backImageSrc: require('../../../assets/images/grandma.png'),
      soundSrc: require('../../../assets/Voice/Lola.mp3'),
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
      <Text style={styles.title}>Filipino Family</Text>
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

export default FilipinoFamily; // Adjusted component name
