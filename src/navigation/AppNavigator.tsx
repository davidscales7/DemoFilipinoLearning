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
// FLASH SUBSCREENS
import Filipinocard1 from "../components/FilipinoFlash/Flashcard1";
import Filipinocard2 from "../components/FilipinoFlash/Flashcard2";
import Filipinocard3 from "../components/FilipinoFlash/Flashcard3";
import Filipinocard4 from "../components/FilipinoFlash/Flashcard4";
import Filipinocard5 from "../components/FilipinoFlash/Flashcard5";
import Filipinocard6 from "../components/FilipinoFlash/Flashcard6";
import Filipinocard7 from "../components/FilipinoFlash/Flashcard7";
import Filipinocard8 from "../components/FilipinoFlash/Flashcard8";
import Filipinocard9 from "../components/FilipinoFlash/Flashcard9";
import Filipinocard10 from "../components/FilipinoFlash/Flashcard10";
import Filipinocard11 from "../components/FilipinoFlash/Flashcard11";

// FLASHCARDS

// LESSONS
import LessonLayout from "../components/FilipinoLessons/LessonLayout";
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
    <Stack.Screen name="LessonLayout" component={LessonLayout} />
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
      <Stack.Screen name="Filipinocard1" component={Filipinocard1} />
      <Stack.Screen name="Filipinocard2" component={Filipinocard2} />
      <Stack.Screen name="Filipinocard3" component={Filipinocard3} />
      <Stack.Screen name="Filipinocard4" component={Filipinocard4} />
      <Stack.Screen name="Filipinocard5" component={Filipinocard5}/>
      <Stack.Screen name="Filipinocard6" component={Filipinocard6} />
      <Stack.Screen name="Filipinocard7" component={Filipinocard7}/>
      <Stack.Screen name="Filipinocard8" component={Filipinocard8} />
      <Stack.Screen name="Filipinocard9" component={Filipinocard9}/>
      <Stack.Screen name="Filipinocard10" component={Filipinocard10} />
      <Stack.Screen name="Filipinocard11" component={Filipinocard11} />
    </Stack.Navigator>
  );
}

export default AppNavigator;
