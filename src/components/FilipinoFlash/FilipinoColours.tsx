import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Flashcard from '../Flashcard';

const FilipinoColours: React.FC = () => {
  const flashcards = [
    {
      front: 'Red',
      back: 'Pula',
      frontImageSrc: require('../../../assets/images/FlagPhilippines.png'),
      backImageSrc: require('../../../assets/images/red.jpg'),
      soundSrc: require('../../../assets/Voice/Pula.mp3'),
    },
    {
      front: 'Yellow',
      back: 'Dilaw',
      frontImageSrc: require('../../../assets/images/FlagPhilippines.png'),
      backImageSrc: require('../../../assets/images/yellow.png'),
      soundSrc: require('../../../assets/Voice/Dilaw.mp3'),
    },
    {
      front: 'Green',
      back: 'Verde',
      frontImageSrc: require('../../../assets/images/FlagPhilippines.png'),
      backImageSrc: require('../../../assets/images/green.png'),
      soundSrc: require('../../../assets/Voice/Verde.mp3'),
    },
    {
      front: 'Blue',
      back: 'Asul',
      frontImageSrc: require('../../../assets/images/FlagPhilippines.png'),
      backImageSrc: require('../../../assets/images/blue.png'),
      soundSrc: require('../../../assets/Voice/Asul.mp3'),
    },
    {
      front: 'Orange',
      back: 'Kahel',
      frontImageSrc: require('../../../assets/images/FlagPhilippines.png'),
      backImageSrc: require('../../../assets/images/orange.png'),
      soundSrc: require('../../../assets/Voice/Kahel.mp3'),
    },
    {
      front: 'White',
      back: 'Puti',
      frontImageSrc: require('../../../assets/images/FlagPhilippines.png'),
      backImageSrc: require('../../../assets/images/white.png'),
      soundSrc: require('../../../assets/Voice/puti.mp3'),
    },
    {
      front: 'Pink',
      back: 'Rosa',
      frontImageSrc: require('../../../assets/images/FlagPhilippines.png'),
      backImageSrc: require('../../../assets/images/pink.jpg'),
      soundSrc: require('../../../assets/Voice/rosa.mp3'),
    },
    {
      front: 'Black',
      back: 'Itim',
      frontImageSrc: require('../../../assets/images/black.png'),
      backImageSrc: require('../../../assets/images/FlagPhilippines.png'),
      soundSrc: require('../../../assets/Voice/itim.mp3'),
    },
    {
      front: 'Brown',
      back: 'Kayumanggi',
      frontImageSrc: require('../../../assets/images/brown.png'),
      backImageSrc: require('../../../assets/images/FlagPhilippines.png'),
      soundSrc: require('../../../assets/Voice/kayumanggi.mp3'),
    },
  ];

  
    const [currentIndex, setCurrentIndex] = useState(0);
    const [reset, setReset] = useState(false);
   const [finished, setFinished] = useState(false);
  
  const handleCorrect = () => {
  
  
    if (currentIndex + 1 === flashcards.length){
      setFinished(true);
      finishedFlashCardTopicForAccoladePosting();
    }else{
      setCurrentIndex((prevIndex) => prevIndex +1);
      setReset(true);
          }
    };

  

    const handleIncorrect = () => {
      setReset(true);
    };
  
    const handleResetComplete = () => {
      setReset(false);
    };


    async function finishedFlashCardTopicForAccoladePosting(){
      try{
        const token = await AsyncStorage.getItem('token');
          const response = await fetch('http://localhost:3000/addflashCardAccolades',{
            method:'POST', 
            headers: { 'Content-Type': 'application/json',Authorization:`Bearer ${token}` },
            body:JSON.stringify({flashCardAccolade: 'Colours Flashcards '}),
          });
          const data = await response.json();
          console.log('Flashcard accolade data:', data);
        }catch(error){
          console.error('Falied to post Colours flashcard accolade:',error);
  
        }
  
      }
  if (finished) {
    return(
      <View style = {styles.container}>
        <Text style={styles.title}>  🎉 Congratulations! 🎉</Text>
         <Text style={styles.message}>You have completed the animal flashcards!</Text>
                <Button
                  title="Restart"
                  onPress={() => {
                    setCurrentIndex(0);
                    setFinished(false);
                  }}
                />
      </View>
    )
  }
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Filipino Colours</Text>
      
      
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
  congratulationsText: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    marginTop: 20,
  },
})

export default FilipinoColours;
