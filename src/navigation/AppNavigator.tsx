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
import FilipinoQuizzes from '../components/FilipinoQuizzes/FilipinoQuizzes';
import FilipinoFlashHome from '../components/FilipinoFlash/FilipinoFlashHome';
import FilipinoFlashNumbersBasic from '../components/FilipinoFlash/FilipinoFlashNumbersBasic'

import Lesson1 from '../components/FilipinoLessons/Lesson1';
import Lesson2 from '../components/FilipinoLessons/Lesson2';
import Lesson3 from '../components/FilipinoLessons/Lesson3';
import Lesson4 from '../components/FilipinoLessons/Lesson4';
import Lesson5 from '../components/FilipinoLessons/Lesson5';
import Lesson6 from '../components/FilipinoLessons/Lesson6';
import Lesson7 from '../components/FilipinoLessons/Lesson7';
import Lesson8 from '../components/FilipinoLessons/Lesson8';
import Loading from './Loading';
import Quiz1 from '../components/FilipinoQuizzes/Quiz1';
//import Lesson9 from '../components/FilipinoLessons/Lesson9';
//import Lesson10 from '../components/FilipinoLessons/Lesson10';




const Stack = createNativeStackNavigator<RootStackParamList>();

function AppNavigator() {
  return (
    <NavigationContainer>
    

    <Stack.Navigator initialRouteName="Loading">  
      
    <Stack.Screen name="RegisterScreen" component={RegisterScreen} /> 
    <Stack.Screen name="Loading" component={Loading} /> 
    <Stack.Screen name="Login" component={LoginScreen} /> 
        <Stack.Screen name="Home" component={AppHeader} />
        <Stack.Screen name="Ukrainian" component={UkrainianScreen} />
        <Stack.Screen name="Filipino" component ={FilipinoLearning}options={{ headerShown: false }} />
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
     
       <Stack.Screen name = "FilipinoFlashHome" component ={FilipinoFlashHome}options={{ headerShown: false }}/>
       <Stack.Screen name = "FilipinoFlashNumbersBasic" component = {FilipinoFlashNumbersBasic}/>
       <Stack.Screen name = "Lesson1" component ={Lesson1}/>
       <Stack.Screen name = "Lesson2" component ={Lesson2}/>
       <Stack.Screen name = "Lesson3" component ={Lesson3}/>
      
       <Stack.Screen name = "Lesson4" component ={Lesson4}/>
       <Stack.Screen name = "Lesson5" component ={Lesson5}/>
       <Stack.Screen name = "Lesson6" component ={Lesson6}/>
       <Stack.Screen name = "Lesson7" component ={Lesson7}/>
       <Stack.Screen name = "Lesson8" component ={Lesson8}/>
       {/*<Stack.Screen name = "Lesson9" component ={Lesson9}/>*/}
       {/*<Stack.Screen name = "Lesson10" component ={Lesson10}/> */}

       <Stack.Screen name = "FilipinoQuizzes" component={FilipinoQuizzes}/>
       <Stack.Screen name = "Quiz1" component={Quiz1}/>
      
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
