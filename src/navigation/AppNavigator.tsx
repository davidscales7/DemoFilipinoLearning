// AppNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './navigation';
import AppHeader from '../components/AppHeader';
import UkrainianScreen from '../components/UkrainianLearning';
import FilipinoLearning from '../components/FilipinoLearning';
import FilipinoGreetingsScreen from '../components/FilipinoFlash/FilipinoGreetings';
import FilipinoBodyparts from '../components/FilipinoFlash/FilipinoBodyparts';
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
import FilipinoQuizzes from '../components/FilipinoQuizzes/FiliipinoQuizzes';
import FilipinoFlashHome from '../components/FilipinoFlash/FilipinoFlashHome';


import Lesson1 from '../components/FilipinoLessons/Lesson1';
const Stack = createNativeStackNavigator<RootStackParamList>();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={AppHeader} />
        <Stack.Screen name="Ukrainian" component={UkrainianScreen} />
        <Stack.Screen name="Filipino" component ={FilipinoLearning} />
        <Stack.Screen name="FilipinoGreetings" component={FilipinoGreetingsScreen} /> 
       <Stack.Screen name = "FilipinoBodyparts" component={FilipinoBodyparts}/>
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
       <Stack.Screen name = "FilipinoQuizzes" component={FilipinoQuizzes}/>
       <Stack.Screen name = "FilipinoAccolades" component ={FilipinoAccolades}/>     
       <Stack.Screen name = "FilipinoFlashHome" component ={FilipinoFlashHome}/>
       
       <Stack.Screen name = "Lesson1" component ={Lesson1}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
