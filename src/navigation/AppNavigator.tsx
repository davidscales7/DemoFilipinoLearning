// src/navigation/AppNavigator.tsx
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./navigation";

// AUTH
import RegisterScreen from "../components/RegisterScreen";
import LoginScreen from "../components/LoginScreen";
import Loading from "./Loading";

// MAIN DASHBOARD
import FilipinoLearning from "../components/FilipinoLearning";

// FLASHCARDS
import FilipinoFlashHome from "../components/FilipinoFlashHome";
import FilipinoFlashNumbersBasic from "../components/FilipinoFlash/FilipinoFlashNumbersBasic";

// FLASH SUBSCREENS
import FilipinoGreetingsScreen from "../components/FilipinoFlash/FilipinoGreetings";
import FilipinoBodyParts from "../components/FilipinoFlash/FilipinoBodyparts";
import FilipinoNewTopic from "../components/FilipinoFlash/FilipinoNewTopic";
import FilipinoDailyLesson from "../components/FilipinoFlash/FilipinoDailyLesson";
import FilipinoColoursScreen from "../components/FilipinoFlash/FilipinoColours";
import FilipinoFamilyScreen from "../components/FilipinoFlash/FilipinoFamily";
import FilipinoFoodAndDrinkScreen from "../components/FilipinoFlash/FilipinoFoodAndDrink";
import FilipinoGeneralTopics from "../components/FilipinoFlash/FilipinoGeneralTopics";
import FilipinoHouseItemsScreen from "../components/FilipinoFlash/FilipinoHouseItems";
import FilipinoSportsScreen from "../components/FilipinoFlash/FilipinoSports";
import FilipinoTransportScreen from "../components/FilipinoFlash/FilipinoTransports";
import FilipinoWeatherScreen from "../components/FilipinoFlash/FilipinoWeather";
import FilipinoAnimalsScreen from "../components/FilipinoFlash/FilipinoAnimals";

// LESSONS
import FilipinoLessons from "../components/FilipinoLessons/FilipinoLessons";
import Lesson1 from "../components/FilipinoLessons/Lesson1";
import Lesson2 from "../components/FilipinoLessons/Lesson2";
import Lesson3 from "../components/FilipinoLessons/Lesson3";
import Lesson4 from "../components/FilipinoLessons/Lesson4";
import Lesson5 from "../components/FilipinoLessons/Lesson5";
import Lesson6 from "../components/FilipinoLessons/Lesson6";
import Lesson7 from "../components/FilipinoLessons/Lesson7";
import Lesson8 from "../components/FilipinoLessons/Lesson8";
import Lesson9 from "../components/FilipinoLessons/Lesson9";
import Lesson10 from "../components/FilipinoLessons/Lesson10";

// QUIZZES
import FilipinoQuizzes from "../components/FilipinoQuizzes/FilipinoQuizzes";
import Quiz1 from "../components/FilipinoQuizzes/Quiz1";
import Quiz2 from "../components/FilipinoQuizzes/Quiz2";
import Quiz3 from "../components/FilipinoQuizzes/Quiz3";
import Quiz4 from "../components/FilipinoQuizzes/Quiz4";
import Quiz5 from "../components/FilipinoQuizzes/Quiz5";
import Quiz6 from "../components/FilipinoQuizzes/Quiz6";
import Quiz7 from "../components/FilipinoQuizzes/Quiz7";
import Quiz8 from "../components/FilipinoQuizzes/Quiz8";
import Quiz9 from "../components/FilipinoQuizzes/Quiz9";
import Quiz10 from "../components/FilipinoQuizzes/Quiz10";

// ACCOLADES
import FilipinoAccolades from "../components/FilipinoAccolades/FilipinoAccolades";

const Stack = createNativeStackNavigator<RootStackParamList>();

function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="FilipinoLearning"
      screenOptions={{
        headerShown: false, // 👈 hide native headers everywhere
      }}
    >
      {/* AUTH FLOW */}
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="Loading" component={Loading} />
      <Stack.Screen name="Login" component={LoginScreen} />

      {/* MAIN DASHBOARD */}
      <Stack.Screen name="FilipinoLearning" component={FilipinoLearning} />

      {/* FLASHCARDS */}
      <Stack.Screen name="FilipinoFlashHome" component={FilipinoFlashHome} />
      <Stack.Screen
        name="FilipinoFlashNumbersBasic"
        component={FilipinoFlashNumbersBasic}
      />

      {/* QUIZZES */}
      <Stack.Screen name="FilipinoQuizzes" component={FilipinoQuizzes} />
      <Stack.Screen name="Quiz1" component={Quiz1} />
      <Stack.Screen name="Quiz2" component={Quiz2} />
      <Stack.Screen name="Quiz3" component={Quiz3} />
      <Stack.Screen name="Quiz4" component={Quiz4} />
      <Stack.Screen name="Quiz5" component={Quiz5} />
      <Stack.Screen name="Quiz6" component={Quiz6} />
      <Stack.Screen name="Quiz7" component={Quiz7} />
      <Stack.Screen name="Quiz8" component={Quiz8} />
      <Stack.Screen name="Quiz9" component={Quiz9} />
      <Stack.Screen name="Quiz10" component={Quiz10} />

      {/* LESSONS */}
      <Stack.Screen name="FilipinoLessons" component={FilipinoLessons} />
      <Stack.Screen name="Lesson1" component={Lesson1} />
      <Stack.Screen name="Lesson2" component={Lesson2} />
      <Stack.Screen name="Lesson3" component={Lesson3} />
      <Stack.Screen name="Lesson4" component={Lesson4} />
      <Stack.Screen name="Lesson5" component={Lesson5} />
      <Stack.Screen name="Lesson6" component={Lesson6} />
      <Stack.Screen name="Lesson7" component={Lesson7} />
      <Stack.Screen name="Lesson8" component={Lesson8} />
      <Stack.Screen name="Lesson9" component={Lesson9} />
      <Stack.Screen name="Lesson10" component={Lesson10} />

      {/* ACCOLADES */}
      <Stack.Screen name="FilipinoAccolades" component={FilipinoAccolades} />

      {/* FLASH SUB SCREENS */}
      <Stack.Screen name="FilipinoGreetings" component={FilipinoGreetingsScreen} />
      <Stack.Screen name="FilipinoBodyParts" component={FilipinoBodyParts} />
      <Stack.Screen name="FilipinoNewTopic" component={FilipinoNewTopic} />
      <Stack.Screen name="FilipinoDailyLesson" component={FilipinoDailyLesson} />
      <Stack.Screen name="FilipinoColours" component={FilipinoColoursScreen} />
      <Stack.Screen name="FilipinoFamily" component={FilipinoFamilyScreen} />
      <Stack.Screen
        name="FilipinoFoodAndDrink"
        component={FilipinoFoodAndDrinkScreen}
      />
      <Stack.Screen
        name="FilipinoGeneralTopics"
        component={FilipinoGeneralTopics}
      />
      <Stack.Screen
        name="FilipinoHouseItems"
        component={FilipinoHouseItemsScreen}
      />
      <Stack.Screen name="FilipinoSports" component={FilipinoSportsScreen} />
      <Stack.Screen
        name="FilipinoTransports"
        component={FilipinoTransportScreen}
      />
      <Stack.Screen name="FilipinoWeather" component={FilipinoWeatherScreen} />
      <Stack.Screen name="FilipinoAnimals" component={FilipinoAnimalsScreen} />
    </Stack.Navigator>
  );
}

export default AppNavigator;
