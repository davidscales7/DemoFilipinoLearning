import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import Flashcard from '../Flashcard';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Animals: React.FC = () => {
  const flashcards = [
    {
      front: 'Cat',
      back: 'Pusa',
      frontImageSrc: require('../../../assets/images/FlagPhilippines.png'),
      backImageSrc: require('../../../assets/images/cat.png'),
      soundSrc: require('../../../assets/Voice/pusa.mp3'),
    },
    {
      front: 'Dog',
      back: 'Aso',
      frontImageSrc: require('../../../assets/images/FlagPhilippines.png'),
      backImageSrc: require('../../../assets/images/dog.png'),
      soundSrc: require('../../../assets/Voice/aso.mp3'),
    },
    {
      front: 'Bird',
      back: 'ibon',
      frontImageSrc: require('../../../assets/images/FlagPhilippines.png'),
      backImageSrc: require('../../../assets/images/bird.png'),
      soundSrc: require('../../../assets/Voice/ibon.mp3'),
    },
    {
      front: 'Monkey',
      back: 'unggoy',
      frontImageSrc: require('../../../assets/images/FlagPhilippines.png'),
      backImageSrc: require('../../../assets/images/monkey.png'),
      soundSrc: require('../../../assets/Voice/unggoy.mp3'),
    },
    {
      front: 'Tiger',
      back: 'tigre',
      frontImageSrc: require('../../../assets/images/FlagPhilippines.png'),
      backImageSrc: require('../../../assets/images/tiger.png'),
      soundSrc: require('../../../assets/Voice/tigre.mp3'),
    },
    {
      front: 'fish',
      back: 'isda',
      frontImageSrc: require('../../../assets/images/FlagPhilippines.png'),
      backImageSrc: require('../../../assets/images/fish.png'),
      soundSrc: require('../../../assets/Voice/isda.mp3'),
    },
    
    {
      front: 'Lion',
      back: 'leon',
      frontImageSrc: require('../../../assets/images/FlagPhilippines.png'),
      backImageSrc: require('../../../assets/images/lion.png'),
      soundSrc: require('../../../assets/Voice/leon.mp3'),
    },

    {
      front: 'Snake',
      back: 'ahas',
      frontImageSrc: require('../../../assets/images/FlagPhilippines.png'),
      backImageSrc: require('../../../assets/images/snake.png'),
      soundSrc: require('../../../assets/Voice/ahas.mp3'),
    },

    {
      front: 'Cow',
      back: 'Baka',
      frontImageSrc: require('../../../assets/images/FlagPhilippines.png'),
      backImageSrc: require('../../../assets/images/beef.png'),
      soundSrc: require('../../../assets/Voice/baka.mp3'),
    },
    {
      front: 'Goat',
      back: 'Kambing',
      frontImageSrc: require('../../../assets/images/FlagPhilippines.png'),
      backImageSrc: require('../../../assets/images/goat.png'),
      soundSrc: require('../../../assets/Voice/kambing.mp3'),
    },

    {
      front: 'Pig',
      back: 'baboy',
      frontImageSrc: require('../../../assets/images/FlagPhilippines.png'),
      backImageSrc: require('../../../assets/images/pig.png'),
      soundSrc: require('../../../assets/Voice/kambing.mp3'),
    },

    
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [reset, setReset] = useState(false);
  const [finished, setFinished] = useState(false);

  const handleCorrect = () => {
    if (currentIndex + 1 === flashcards.length) {
      setFinished(true); // Set finished to true if it's the last card
      finishedFlashCardTopicForAccoladePosting();
    } else {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setReset(true);
    }
  };

  const handleIncorrect = () => {
    setReset(true); // Allow resetting even if incorrect
  };

  const handleResetComplete = () => {
    setReset(false);
  };

  async function finishedFlashCardTopicForAccoladePosting() {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch('http://localhost:3000/addflashCardAccolades', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ flashCardAccolade: 'Animal Flash Cards' }),
      });
      const data = await response.json();
      console.log('Flashcard accolade data:', data);
    } catch (error) {
      console.error('Failed to post animal flashcard accolade:', error);
    }
  }

  if (finished) {
    return (
      
      <View style={styles.container}>
        <Text style={styles.title}>🎉 Congratulations! 🎉</Text>
        <Text style={styles.message}>You have completed the animal flashcards!</Text>
        <Button
          title="Restart"
          onPress={() => {
            setCurrentIndex(0);
            setFinished(false);
          }}
        />
      </View>
    );
  }

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
    backgroundColor: '#6489bd',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  message: {
    fontSize: 18,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    marginTop: 20,
  },
 
});

export default Animals;
