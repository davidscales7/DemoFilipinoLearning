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


      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
