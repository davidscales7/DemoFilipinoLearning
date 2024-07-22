// AppNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './navigation';
import AppHeader from '../components/AppHeader';
import UkrainianScreen from '../components/UkrainianLearning';
import FilipinoLearning from '../components/FilipinoLearning';

const Stack = createStackNavigator<RootStackParamList>();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={AppHeader} />
        <Stack.Screen name="Ukrainian" component={UkrainianScreen} />
        <Stack.Screen name="Filipino" component={FilipinoLearning} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
