import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import Flashcard from '../Flashcard';

const FilipinoFoodAndDrink: React.FC = () => {
  const flashcards = [
    {
      front: 'Fried Chicken',
      back: 'Prio na manok',
      frontImageSrc: require('../../../assets/images/FlagPhilippines.png'),
      backImageSrc: require('../../../assets/images/FriedChicken.png'),
      soundSrc: require('../../../assets/Voice/PrioNaManok.mp3'),
    },
    {
      front: 'Chicken',
      back: 'Manok',
      frontImageSrc: require('../../../assets/images/FlagPhilippines.png'),
      backImageSrc: require('../../../assets/images/chicken.jpg'),

    },
    {
      front: 'Rice',
      back: 'Kanin',
      frontImageSrc: require('../../../assets/images/FlagPhilippines.png'),
      backImageSrc: require('../../../assets/images/rice.png'),
      soundSrc: require('../../../assets/Voice/kanin.mp3'),
    },
    {
      front: 'Soup',
      back: 'Sabaw',
      frontImageSrc: require('../../../assets/images/FlagPhilippines.png'),
      backImageSrc: require('../../../assets/images/soup.jpg'),
      soundSrc: require('../../../assets/Voice/sabaw.mp3'),
    },
    {
      front: 'Fish',
      back: 'Isda',
      frontImageSrc: require('../../../assets/images/FlagPhilippines.png'),
      backImageSrc: require('../../../assets/images/fish.png'),
      soundSrc: require('../../../assets/Voice/isda.mp3'),
    },
    {
      front: 'Pork',
      back: 'Baboy',
      frontImageSrc: require('../../../assets/images/FlagPhilippines.png'),
      backImageSrc: require('../../../assets/images/pig.png'),
      soundSrc: require('../../../assets/Voice/baboy.mp3'),
    },
    {
      front: 'Beef',
      back: 'Baka',
      frontImageSrc: require('../../../assets/images/FlagPhilippines.png'),
      backImageSrc: require('../../../assets/images/beef.png'),
      soundSrc: require('../../../assets/Voice/baka.mp3'),
    },
    {
      front: 'Vegetables',
      back: 'Gulay',
      frontImageSrc: require('../../../assets/images/FlagPhilippines.png'),
      backImageSrc: require('../../../assets/images/vegetables.png'),
      soundSrc: require('../../../assets/Voice/gulay.mp3'),
    },
    {
      front: 'Water',
      back: 'Tubig',
      frontImageSrc: require('../../../assets/images/FlagPhilippines.png'),
      backImageSrc: require('../../../assets/images/water.png'),
      soundSrc: require('../../../assets/Voice/tubig.mp3'),
    },
    {
      front: 'Coffee',
      back: 'Cape',
      frontImageSrc: require('../../../assets/images/FlagPhilippines.png'),
      backImageSrc: require('../../../assets/images/coffee.png'),
      soundSrc: require('../../../assets/Voice/cape.mp3'),
    },
    {
      front: 'Tea',
      back: 'Tsaa',
      frontImageSrc: require('../../../assets/images/FlagPhilippines.png'),
      backImageSrc: require('../../../assets/images/tea.png'),
      soundSrc: require('../../../assets/Voice/tsaa.mp3'),
    },
    {
      front: 'Juice',
      back: 'Juice',
      frontImageSrc: require('../../../assets/images/FlagPhilippines.png'),
      backImageSrc: require('../../../assets/images/juice.png'),
      
    },
    {
      front: 'Wine',
      back: 'Vino',
      frontImageSrc: require('../../../assets/images/FlagPhilippines.png'),
      backImageSrc: require('../../../assets/images/wine.png'),
      soundSrc: require('../../../assets/Voice/vino.mp3'),
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
      <Text style={styles.title}>Filipino Food and Drink</Text>
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
    backgroundColor: '#6489bd',
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

export default FilipinoFoodAndDrink;
