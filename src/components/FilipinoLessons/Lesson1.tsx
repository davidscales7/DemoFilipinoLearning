import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  PanResponder,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";

import AppLayout from "../../components/Layout/AppLayout";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/navigation";

import { useXPStore } from "../../store/useXPStore";
import AnimatedXPBadge from "../../components/XP/AnimatedXPBadge";

const { width } = Dimensions.get("window");
type Nav = StackNavigationProp<RootStackParamList>;

/* ----------------------------------------
      SLIDES
---------------------------------------- */
const slides = [
  { word: "Kamusta", translated: "Hello / how are you?", image: require("../../../assets/images/hello.png") },
  { word: "Mabuti", translated: "I'm Good", image: require("../../../assets/images/good.jpg") },
  { word: "Malungkot", translated: "I'm Sad", image: require("../../../assets/images/sad.jpg") },
  { word: "Masaya", translated: "I'm Happy", image: require("../../../assets/images/happy.jpg") },
  { word: "Magandang Umaga", translated: "Good Morning", image: require("../../../assets/images/morning.jpg") },
  { word: "Magandang Hapon", translated: "Good Afternoon", image: require("../../../assets/images/afternoon.jpg") },
  { word: "Magandang Gabi", translated: "Good Evening", image: require("../../../assets/images/evening.jpg") },
  { word: "Paalam", translated: "Goodbye", image: require("../../../assets/images/goodbye.jpg") },
  { word: "Ikaw", translated: "You", image: require("../../../assets/images/you.jpg") },
];

/* ----------------------------------------
      QUIZ QUESTIONS
---------------------------------------- */
const questions = [
  {
    question: "What is the correct way to greet someone?",
    options: ["Masaya", "Mabuti", "Malungkot", "Kamusta"],
    correct: "Kamusta",
    image: require("../../../assets/images/hand.jpg"),
  },
  {
    question: "How do you say 'I'm sad'?",
    options: ["Paalam", "Masaya", "Ikaw", "Malungkot"],
    correct: "Malungkot",
    image: require("../../../assets/images/sad.jpg"),
  },
];

/* ----------------------------------------
      COMPONENT
---------------------------------------- */
const Lesson1 = () => {
  const navigation = useNavigation<Nav>();

  const xp = useXPStore((state) => state.xp);
  const addXP = useXPStore((state) => state.addXP);

  const [page, setPage] = useState<"slides" | "quiz" | "summary">("slides");
  const [slideIndex, setSlideIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [previousXP, setPreviousXP] = useState(0);

  const shakeAnim = useRef(new Animated.Value(0)).current;
  const rewardXP = 15;
console.log("Lesson1 XP store value:", xp);

  /* ----------------------------------------
      SWIPE HANDLERS
  ---------------------------------------- */
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (_, g) => Math.abs(g.dx) > 20,
    onPanResponderRelease: (_, g) => {
      if (g.dx < -100) handleNextSlide();
    },
  });

  const handleNextSlide = () => {
    if (slideIndex < slides.length - 1) {
      setSlideIndex(slideIndex + 1);
    } else {
      setPage("quiz");
    }
  };

  /* ----------------------------------------
      QUIZ ANSWER LOGIC
  ---------------------------------------- */
  const handleAnswer = (opt: string) => {
    setSelected(opt);
    const correct = questions[questionIndex].correct;

    if (opt !== correct) {
      Animated.sequence([
        Animated.timing(shakeAnim, { toValue: 10, duration: 70, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: -10, duration: 70, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 0, duration: 70, useNativeDriver: true }),
      ]).start();
      return;
    }

    setTimeout(() => {
      setSelected(null);

      if (questionIndex < questions.length - 1) {
        setQuestionIndex(questionIndex + 1);
      } else {
        const oldXP = xp;
        setPreviousXP(oldXP);

        setPage("summary");

        setTimeout(() => {
          addXP(rewardXP);
          sendAccolade();
        }, 1300);
      }
    }, 600);
  };

  const sendAccolade = async () => {
    const token = await AsyncStorage.getItem("token");
    if (!token) return;

    fetch("http://localhost:3000/addAccolade", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ accolade: "Lesson 1" }),
    });
  };

  /* ----------------------------------------
      SUMMARY SCREEN
  ---------------------------------------- */
  if (page === "summary") {
  return (
    <AppLayout
      title="Lesson Complete"
      animatedStartXP={previousXP}
      animatedEndXP={previousXP + rewardXP}
    >
      <LinearGradient colors={["#C9E6FF", "#E8F7FF"]} style={styles.center}>
        <Text style={styles.summaryTitle}>🎉 Lesson Complete!</Text>
        <Text style={styles.summaryXP}>+{rewardXP} XP Earned</Text>

        <AnimatedXPBadge
          startXP={previousXP}
          endXP={previousXP + rewardXP}
          size={140}
        />

        
          <Text style={styles.backButtonText}>Back to Lessons</Text>
      
      </LinearGradient>
    </AppLayout>
  );
}

  /* ----------------------------------------
      QUIZ SCREEN
  ---------------------------------------- */
  if (page === "quiz") {
    const q = questions[questionIndex];

    return (
      <AppLayout title="Lesson 1 Quiz">
        <LinearGradient colors={["#FFDEE9", "#B5FFFC"]} style={styles.center}>
          <Text style={styles.quizQuestion}>{q.question}</Text>

          <Image source={q.image} style={styles.quizImage} />

          <Animated.View style={{ transform: [{ translateX: shakeAnim }] }}>
            {q.options.map((opt) => (
              <TouchableOpacity
                key={opt}
                style={[
                  styles.optionButton,
                  selected === opt && {
                    backgroundColor: opt === q.correct ? "#7DDA8E" : "#FF6B6B",
                  },
                ]}
                onPress={() => handleAnswer(opt)}
              >
                <Text style={styles.optionText}>{opt}</Text>
              </TouchableOpacity>
            ))}
          </Animated.View>
        </LinearGradient>
      </AppLayout>
    );
  }

  /* ----------------------------------------
      SLIDES SCREEN
  ---------------------------------------- */
  const slide = slides[slideIndex];

  return (
    <AppLayout title="Lesson 1">
      <LinearGradient
        colors={["#FFDEE9", "#B5FFFC"]}
        style={styles.center}
        {...panResponder.panHandlers}
      >
        <Text style={styles.wordText}>{slide.word}</Text>
        <Image source={slide.image} style={styles.slideImage} />
        <Text style={styles.translation}>{slide.translated}</Text>

        <TouchableOpacity style={styles.nextBtn} onPress={handleNextSlide}>
          <Text style={styles.nextText}>Next</Text>
        </TouchableOpacity>
      </LinearGradient>
    </AppLayout>
  );
};

/* ----------------------------------------
      STYLES
---------------------------------------- */
const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  wordText: { fontSize: 34, fontWeight: "bold", marginBottom: 20 },
  slideImage: { width: 260, height: 260, borderRadius: 12, marginBottom: 20 },
  translation: { fontSize: 20, opacity: 0.8, marginBottom: 40 },
  nextBtn: { backgroundColor: "#4A90E2", paddingHorizontal: 40, paddingVertical: 15, borderRadius: 12 },
  nextText: { color: "white", fontSize: 18, fontWeight: "bold" },

  quizQuestion: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  quizImage: { width: 200, height: 200, marginBottom: 20 },
  optionButton: {
    padding: 15,
    backgroundColor: "#FFF",
    width: width * 0.8,
    marginVertical: 8,
    borderRadius: 10,
  },
  optionText: { fontSize: 18, textAlign: "center" },

  summaryTitle: { fontSize: 30, fontWeight: "bold", marginBottom: 10 },
  summaryXP: { fontSize: 20, marginBottom: 30 },
  backButton: {
    backgroundColor: "#4A90E2",
    padding: 15,
    paddingHorizontal: 40,
    borderRadius: 12,
    marginTop: 30,
  },
  backButtonText: { color: "white", fontWeight: "bold", fontSize: 18 },
});

export default Lesson1;
