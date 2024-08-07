import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import Flashcard from '../Flashcard';

const FilipinoGeneralTopics: React.FC = () => {
  const flashcards = [
    {
      front: 'Shops',
      back: 'Tindahan',
      frontImageSrc: require('../../../assets/images/FlagPhilippines.png'),
      backImageSrc: require('../../../assets/images/shop.png'),
      soundSrc: require('../../../assets/Voice/tindahan.mp3'),
    },
    {
      front: 'Driving',
      back: 'Nagmamaneho',
      frontImageSrc: require('../../../assets/images/FlagPhilippines.png'),
      backImageSrc: require('../../../assets/images/driving.png'),
      soundSrc: require('../../../assets/Voice/nagmamaneho.mp3'),
    },
    {
      front: 'Shoes',
      back: 'Sapatos',
      frontImageSrc: require('../../../assets/images/FlagPhilippines.png'),
      backImageSrc: require('../../../assets/images/shoes.png'),
      soundSrc: require('../../../assets/Voice/sapatos.mp3'),
    },
    {
      front: 'Running',
      back: 'Tumatakbo',
      frontImageSrc: require('../../../assets/images/FlagPhilippines.png'),
      backImageSrc: require('../../../assets/images/running.png'),
      soundSrc: require('../../../assets/Voice/tumatakbo.mp3'),
    },
    {
      front: 'Going to somewhere',
      back: 'Pumupunta sa',
      frontImageSrc: require('../../../assets/images/FlagPhilippines.png'),
      backImageSrc: require('../../../assets/images/goingToSomewhere.png'),
      soundSrc: require('../../../assets/Voice/Papuntasa.mp3'),
    },
    {
      front: 'Bank',
      back: 'Banko',
      frontImageSrc: require('../../../assets/images/FlagPhilippines.png'),
      backImageSrc: require('../../../assets/images/bank.jpg'),
      soundSrc: require('../../../assets/Voice/banko.mp3'),
    },
    {
      front: 'Listening',
      back: 'Kumikinig',
      frontImageSrc: require('../../../assets/images/FlagPhilippines.png'),
      backImageSrc: require('../../../assets/images/listening.png'),
      soundSrc: require('../../../assets/Voice/kumikinig.mp3'),
    },
    {
      front: 'Restaurant',
      back: 'Restorante',
      frontImageSrc: require('../../../assets/images/FlagPhilippines.png'),
      backImageSrc: require('../../../assets/images/restaurant.png'),
      soundSrc: require('../../../assets/Voice/restorante.mp3'),
    },
    {
      front: 'Church',
      back: 'Simbahan/Iglesia',
      frontImageSrc: require('../../../assets/images/FlagPhilippines.png'),
      backImageSrc: require('../../../assets/images/church.png'),
      soundSrc: require('../../../assets/Voice/simbahan-iglesia.mp3'),
    },
     
    {
      front: 'I',
      back: 'Ako/Ko',
      frontImageSrc: require('../../../assets/images/FlagPhilippines.png'),
      backImageSrc: require('../../../assets/images/i.png'),
      soundSrc: require('../../../assets/Voice/ako-ko.mp3'),
    },
    {
      front: 'You',
      back: 'Ikaw',
      frontImageSrc: require('../../../assets/images/FlagPhilippines.png'),
      backImageSrc: require('../../../assets/images/you.png'),
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
      <Text style={styles.title}>Filipino General Topics</Text>
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

export default FilipinoGeneralTopics;
