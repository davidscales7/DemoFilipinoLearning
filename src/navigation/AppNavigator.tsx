// AppNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './navigation';
import RegisterScreen from '../components/RegisterScreen';
import LoginScreen from '../components/LoginScreen'; 
import AppHeader from '../components/AppHeader';

import UkrainianScreen from '../components/UkrainianLearning';
import FilipinoLearning from '../components/FilipinoLearning';
import FilipinoGreetingsScreen from '../components/FilipinoFlash/FilipinoGreetings';
import FilipinoBodyParts from '../components/FilipinoFlash/FilipinoBodyparts';
import FilipinoNewTopic from '../components/FilipinoFlash/FilipinoNewTopic';
import FilipinoDailyLesson from '../components/FilipinoFlash/FilipinoDailyLesson';
import FilipinoColoursScreen from '../components/FilipinoFlash/FilipinoColours';
import FilipinoFamilyScreen from '../components/FilipinoFlash/FilipinoFamily';
import FilipinoFoodAndDrinkScreen from '../components/FilipinoFlash/FilipinoFoodAndDrink';
import FilipinoGeneralTopics from '../components/FilipinoFlash/FilipinoGeneralTopics';
import FilipinoHouseItemsScreen from '../components/FilipinoFlash/FilipinoHouseItems';
import FilipinoSportsScreen from '../components/FilipinoFlash/FilipinoSports';
import FilipinoTransportScreen from '../components/FilipinoFlash/FilipinoTransports';
import FilipinoWeatherScreen from '../components/FilipinoFlash/FilipinoWeather';
import FilipinoAnimalsScreen from '../components/FilipinoFlash/FilipinoAnimals';
import FilipinoLessons from '../components/FilipinoLessons/FilipinoLessons';
import FilipinoAccolades from '../components/FilipinoAccolades/FilipinoAccolades';
import FilipinoLessonQuizzes from '../components/FilipinoQuizzes/FilipinoLessonQuiz';
import FilipinoFlashHome from '../components/FilipinoFlash/FilipinoFlashHome';
import FilipinoFlashNumbersBasic from '../components/FilipinoFlash/FilipinoFlashNumbersBasic'

import Lesson1 from '../components/FilipinoLessons/Lesson1';
import Lesson2 from '../components/FilipinoLessons/Lesson2';
import Lesson3 from '../components/FilipinoLessons/Lesson3';
import Lesson4 from '../components/FilipinoLessons/Lesson4';



const Stack = createNativeStackNavigator<RootStackParamList>();

function AppNavigator() {
  return (
    <NavigationContainer>
    

    <Stack.Navigator initialRouteName="Login">  
      
    <Stack.Screen name="RegisterScreen" component={RegisterScreen} /> 
 
      <Stack.Screen name="Login" component={LoginScreen} /> 
        <Stack.Screen name="Home" component={AppHeader} />
        <Stack.Screen name="Ukrainian" component={UkrainianScreen} />
        <Stack.Screen name="Filipino" component ={FilipinoLearning} />
        <Stack.Screen name="FilipinoGreetings" component={FilipinoGreetingsScreen} /> 
       <Stack.Screen name = "FilipinoBodyParts" component={FilipinoBodyParts}/>
       <Stack.Screen name = "FilipinoNewTopic" component={FilipinoNewTopic}/>
       <Stack.Screen name = "FilipinoDailyLesson" component={FilipinoDailyLesson}/>
       <Stack.Screen name = "FilipinoColours" component={FilipinoColoursScreen}/>
       <Stack.Screen name = "FilipinoFamily" component={FilipinoFamilyScreen}/>
       <Stack.Screen name = "FilipinoFoodAndDrink" component={FilipinoFoodAndDrinkScreen}/>
       <Stack.Screen name = "FilipinoGeneralTopics" component={FilipinoGeneralTopics}/>
       <Stack.Screen name = "FilipinoHouseItems" component={FilipinoHouseItemsScreen}/>
       <Stack.Screen name = "FilipinoSports" component={FilipinoSportsScreen}/>
       <Stack.Screen name = "FilipinoTransports" component={FilipinoTransportScreen}/>
       <Stack.Screen name = "FilipinoWeather" component={FilipinoWeatherScreen}/>
       <Stack.Screen name = "FilipinoAnimals" component={FilipinoAnimalsScreen}/>
       <Stack.Screen name = "FilipinoLessons" component={FilipinoLessons}/>
       
       <Stack.Screen name = "FilipinoAccolades" component ={FilipinoAccolades}/>     
     
       <Stack.Screen name = "FilipinoFlashHome" component ={FilipinoFlashHome}/>
       <Stack.Screen name = "FilipinoFlashNumbersBasic" component = {FilipinoFlashNumbersBasic}/>
       <Stack.Screen name = "Lesson1" component ={Lesson1}/>
       <Stack.Screen name = "Lesson2" component ={Lesson2}/>
       <Stack.Screen name = "Lesson3" component ={Lesson3}/>
      
       <Stack.Screen name = "Lesson4" component ={Lesson4}/>
      
       <Stack.Screen name = "FilipinoLessonQuiz" component={FilipinoLessonQuizzes}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
