import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import Flashcard from '../Flashcard';

const Greetings: React.FC = () => {
  const flashcards = [
    {
      front: 'Rain',
      back: 'Ulan',
      frontImageSrc: require('../../../assets/images/FlagPhilippines.png'),
      backImageSrc: require('../../../assets/images/rain.png'),
      soundSrc: require('../../../assets/Voice/ulan.mp3'),
    },
    {
      front: 'Raining',
      back: 'Umuulan',
      frontImageSrc: require('../../../assets/images/FlagPhilippines.png'),
      backImageSrc: require('../../../assets/images/rain.png'),
      soundSrc: require('../../../assets/Voice/umuulan.mp3'),
    },
    {
      front: 'Sun',
      back: 'Araw',
      frontImageSrc: require('../../../assets/images/FlagPhilippines.png'),
      backImageSrc: require('../../../assets/images/sun.png'),
      soundSrc: require('../../../assets/Voice/araw.mp3'),
    },
    {
      front: 'Sunny',
      back: 'Maaraw',
      frontImageSrc: require('../../../assets/images/FlagPhilippines.png'),
      backImageSrc: require('../../../assets/images/sun.png'),
      soundSrc: require('../../../assets/Voice/maaraw.mp3'),
    },
    {
      front: 'Gloomy',
      back: 'Makulimlim',
      frontImageSrc: require('../../../assets/images/FlagPhilippines.png'),
      backImageSrc: require('../../../assets/images/gloomy.png'),
      soundSrc: require('../../../assets/Voice/makulimlim.mp3'),
    },
    {
      front: 'Thunder',
      back: 'Kidlat',
      frontImageSrc: require('../../../assets/images/FlagPhilippines.png'),
      backImageSrc: require('../../../assets/images/thunder.png'),
      soundSrc: require('../../../assets/Voice/kidlat.mp3'),
    },
    {
      front: 'Thundering',
      back: 'Kulog',
      frontImageSrc: require('../../../assets/images/FlagPhilippines.png'),
      backImageSrc: require('../../../assets/images/thunder.png'),
      soundSrc: require('../../../assets/Voice/kulog.mp3'),
    },
    {
      front: 'Stormy',
      back: 'Bagyo',
      frontImageSrc: require('../../../assets/images/FlagPhilippines.png'),
      backImageSrc: require('../../../assets/images/stormy.png'),
      soundSrc: require('../../../assets/Voice/bagyo.mp3'),
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
      <Text style={styles.title}>Filipino Weather</Text>
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
    backgroundColor:'#6489bd',
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
