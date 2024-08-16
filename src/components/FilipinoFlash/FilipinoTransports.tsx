import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import Flashcard from '../Flashcard';

const Greetings: React.FC = () => {
  const flashcards = [
    {
      front: 'Car',
      back: 'Kotse/Sasakyan',
      frontImageSrc: require('../../../assets/images/FlagPhilippines.png'),
      backImageSrc: require('../../../assets/images/car.png'),
      soundSrc: require('../../../assets/Voice/KotseSasakyan.mp3'),
    },
    {
      front: 'Airplane',
      back: 'Eroplano',
      frontImageSrc: require('../../../assets/images/FlagPhilippines.png'),
      backImageSrc: require('../../../assets/images/airplane.png'),
      soundSrc: require('../../../assets/Voice/eroplano.mp3'),
    },
    {
      front: 'Train',
      back: 'Tren',
      frontImageSrc: require('../../../assets/images/FlagPhilippines.png'),
      backImageSrc: require('../../../assets/images/train.png'),
      soundSrc: require('../../../assets/Voice/tren.mp3'),
    },
    {
      front: 'Boat',
      back: 'Barko',
      frontImageSrc: require('../../../assets/images/FlagPhilippines.png'),
      backImageSrc: require('../../../assets/images/boat.png'),
      soundSrc: require('../../../assets/Voice/barko.mp3'),
    },
    {
      front: 'Motorcycle',
      back: 'MotorSiklo',
      frontImageSrc: require('../../../assets/images/FlagPhilippines.png'),
      backImageSrc: require('../../../assets/images/motorcycle.png'),
      soundSrc: require('../../../assets/Voice/motorsiklo.mp3'),
    },
    {
      front: 'Bus',
      back: 'Bus',
      frontImageSrc: require('../../../assets/images/FlagPhilippines.png'),
      backImageSrc: require('../../../assets/images/bus.png'),
      soundSrc: require('../../../assets/Voice/bus.mp3'),
    },
    {
      front: 'Bicycle',
      back: 'Bisikleta',
      frontImageSrc: require('../../../assets/images/FlagPhilippines.png'),
      backImageSrc: require('../../../assets/images/bicycle.png'),
      soundSrc: require('../../../assets/Voice/bisikleta.mp3'),
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
      <Text style={styles.title}>Filipino Transports</Text>
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
