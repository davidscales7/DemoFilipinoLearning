// AppNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './navigation';
import AppHeader from '../components/AppHeader';
import UkrainianScreen from '../components/UkrainianLearning';
import FilipinoLearning from '../components/FilipinoLearning';
import FilipinoGreetingsScreen from '../components/FilipinoLessons/FilipinoGreetings';
import FilipinoBodyparts from '../components/FilipinoLessons/FilipinoBodyparts';
import FilipinoNewTopic from '../components/FilipinoLessons/FilipinoNewTopic';
import FilipinoDailyLesson from '../components/FilipinoLessons/FilipinoDailyLesson';
import FilipinoColoursScreen from '../components/FilipinoLessons/FilipinoColours';
import FilipinoFamilyScreen from '../components/FilipinoLessons/FilipinoFamily';
import FilipinoFoodAndDrinkScreen from '../components/FilipinoLessons/FilipinoFoodAndDrink';
import FilipinoGeneralTopics from '../components/FilipinoLessons/FilipinoGeneralTopics';
import FilipinoHouseItemsScreen from '../components/FilipinoLessons/FilipinoHouseItems';
import FilipinoSportsScreen from '../components/FilipinoLessons/FilipinoSports';
import FilipinoTransportScreen from '../components/FilipinoLessons/FilipinoTransports';
import FilipinoWeatherScreen from '../components/FilipinoLessons/FilipinoWeather';
import FilipinoAnimalsScreen from '../components/FilipinoLessons/FilipinoAnimals';




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
       
       
       

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
