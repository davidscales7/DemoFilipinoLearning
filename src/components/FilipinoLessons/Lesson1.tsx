// Lesson1.tsx
import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
  PanResponder,
  useWindowDimensions,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

import AppLayout from "../../components/Layout/AppLayout";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/navigation";

import { useXPStore } from "../../store/useXPStore";
import AnimatedXPBadge from "../../components/XP/AnimatedXPBadge";

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
  MAIN COMPONENT
---------------------------------------- */
const Lesson1: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const { width, height } = useWindowDimensions();

  const isWide = width >= 950;
  const maxCanvasWidth = 1260;
  const cardWidth = Math.min(maxCanvasWidth, width - 48);

  const imageSize = Math.min(
    cardWidth * (isWide ? 0.55 : 0.9),
    height * 0.55,
    560
  );

  const xp = useXPStore((s) => s.xp);
  const addXP = useXPStore((s) => s.addXP);

  const [page, setPage] = useState<"slides" | "quiz" | "summary">("slides");
  const [slideIndex, setSlideIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [previousXP, setPreviousXP] = useState(0);

  const shakeAnim = useRef(new Animated.Value(0)).current;
  const rewardXP = 15;

  /* ----------------------------------------
    SWIPE HANDLING
  ---------------------------------------- */
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (_, g) => Math.abs(g.dx) > 20,
    onPanResponderRelease: (_, g) => {
      if (g.dx < -100) handleNextSlide();
      if (g.dx > 100) handlePrevSlide();
    },
  });

  const handlePrevSlide = () => setSlideIndex((i) => Math.max(0, i - 1));

  const handleNextSlide = () => {
    if (slideIndex < slides.length - 1) setSlideIndex(slideIndex + 1);
    else setPage("quiz");
  };

  const onTip = () => console.log("Tip clicked");

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
        const oldXP = useXPStore.getState().xp;
        setPreviousXP(oldXP);

        setPage("summary");

        setTimeout(() => {
          addXP(rewardXP);
          sendAccolade();
        }, 650);
      }
    }, 450);
  };

  const sendAccolade = async () => {
    const token = await AsyncStorage.getItem("token");
    if (!token) return;

    fetch("http://localhost:3000/addAccolade", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ accolade: "Lesson 1" }),
    }).catch(() => {});
  };

  const playAudio = () => console.log("Play sound for: ", slides[slideIndex].word);

  /* ----------------------------------------
    FRAME WRAPPER
  ---------------------------------------- */
  const Frame: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <LinearGradient colors={["#EEF2F7", "#F8FAFC"]} style={styles.bg}>
      <View style={[styles.canvas, { maxWidth: maxCanvasWidth }]}>{children}</View>
    </LinearGradient>
  );

  /* ----------------------------------------
    SUMMARY PAGE
  ---------------------------------------- */
  if (page === "summary") {
    return (
      <AppLayout title="Lesson 1" animatedStartXP={previousXP} animatedEndXP={previousXP + rewardXP}>
        <View style={styles.lessonCard}>
          <View style={styles.pillRowCentered}>
            <View style={styles.pill}>
              <Text style={styles.pillText}>LESSON 1</Text>
            </View>
          </View>

          <Text style={styles.bigWord}>Nice work 🎉</Text>
          <Text style={styles.subText}>You earned +{rewardXP} XP</Text>

          <View style={{ alignItems: "center", marginTop: 18 }}>
            <AnimatedXPBadge startXP={previousXP} endXP={previousXP + rewardXP} size={150} />
          </View>

          <View style={styles.bottomRow}>
            <TouchableOpacity style={[styles.btn, styles.btnGhost]} onPress={() => navigation.goBack()}>
              <Text style={styles.btnGhostText}>Back</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.btn, styles.btnPrimary]}
              onPress={() => navigation.navigate("FilipinoLessons" as never)}
            >
              <Text style={styles.btnPrimaryText}>Back to Lessons →</Text>
            </TouchableOpacity>
          </View>
        </View>
      </AppLayout>
    );
  }

  /* ----------------------------------------
    QUIZ PAGE
  ---------------------------------------- */
  if (page === "quiz") {
    const q = questions[questionIndex];
    const pct = Math.round(((questionIndex + 1) / questions.length) * 100);

    return (
      <AppLayout title="Lesson 1">
        <View style={styles.lessonCard}>
          <View style={styles.topBarRow}>
            <View style={styles.pill}>
              <Text style={styles.pillText}>QUIZ</Text>
            </View>

            <Text style={styles.progressText}>{questionIndex + 1}/{questions.length} • {pct}%</Text>
          </View>

          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${pct}%` }]} />
          </View>

          <View style={[styles.contentRow, isWide && styles.contentRowWide]}>
            <View style={styles.leftCol}>
              <Text style={styles.quizQuestion}>{q.question}</Text>

              <Animated.View style={{ transform: [{ translateX: shakeAnim }] }}>
                <View style={styles.optionsWrap}>
                  {q.options.map((opt) => {
                    const isSelected = selected === opt;
                    const isCorrect = opt === q.correct;
                    return (
                      <TouchableOpacity
                        key={opt}
                        style={[
                          styles.optionButton,
                          isSelected && (isCorrect ? styles.optCorrect : styles.optWrong),
                        ]}
                        onPress={() => handleAnswer(opt)}
                      >
                        <Text style={styles.optionText}>{opt}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </Animated.View>
            </View>

            <View style={styles.rightCol}>
              <Image source={q.image} style={[styles.image, { width: imageSize * 0.8, height: imageSize * 0.8 }]} />
            </View>
          </View>

          <View style={styles.bottomRow}>
            <TouchableOpacity style={[styles.btn, styles.btnGhost]} onPress={onTip}>
              <Text style={styles.btnGhostText}>↙ Tip</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.btn, styles.btnPrimary]} onPress={() => setPage("slides")}>
              <Text style={styles.btnPrimaryText}>Back to cards</Text>
            </TouchableOpacity>
          </View>
        </View>
      </AppLayout>
    );
  }

  /* ----------------------------------------
    SLIDE PAGE
  ---------------------------------------- */
  const slide = slides[slideIndex];
  const pct = Math.round(((slideIndex + 1) / slides.length) * 100);

  return (
    <AppLayout title="Lesson 1">
      <Frame>
        <View style={styles.lessonCard} {...panResponder.panHandlers}>
          <View style={styles.topBarRow}>
            <View style={styles.pill}>
              <Text style={styles.pillText}>LESSON 1</Text>
            </View>

            <Text style={styles.progressText}>{slideIndex + 1}/{slides.length} • {pct}%</Text>
          </View>

          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${pct}%` }]} />
          </View>

          {isWide ? (
            <View style={[styles.slideContentRow, styles.slideContentRowWide]}>
              <View style={styles.slideTextCol}>
                <Text style={styles.bigWord}>{slide.word}</Text>
                <Text style={styles.subText}>{slide.translated}</Text>

                <TouchableOpacity onPress={playAudio} style={[styles.speakerButton, { marginLeft: 0, marginTop: 18 }]}>
                  <Ionicons name="volume-high" size={22} color="#FFFFFF" />
                </TouchableOpacity>
              </View>

              <View style={styles.slideImageCol}>
                <Image source={slide.image} style={[styles.illustration, { width: imageSize, height: imageSize }]} />
              </View>
            </View>
          ) : (
            <View style={styles.centerArea}>
              <View style={{ alignItems: "center" }}>
                <View style={[styles.illustrationCard, { width: imageSize }]}>
                  <Image source={slide.image} style={[styles.illustration, { width: imageSize, height: imageSize }]} />

                  <View style={styles.captionCard}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.captionWord}>{slide.word}</Text>
                      <Text style={styles.captionTranslation}>{slide.translated}</Text>
                    </View>

                    <TouchableOpacity onPress={playAudio} style={styles.speakerButton}>
                      <Ionicons name="volume-high" size={22} color="#FFFFFF" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          )}

          {/* Buttons */}
          <View style={[styles.bottomRow, isWide && { marginTop: 26 }]}>
            <TouchableOpacity style={[styles.btn, styles.btnGhost]} onPress={onTip}>
              <Text style={styles.btnGhostText}>↙ Tip</Text>
            </TouchableOpacity>

            <View style={{ flexDirection: "row", gap: 10 }}>
              <TouchableOpacity
                disabled={slideIndex === 0}
                style={[styles.btn, styles.btnGhost, slideIndex === 0 && { opacity: 0.5 }]}
                onPress={handlePrevSlide}
              >
                <Text style={styles.btnGhostText}>← Back</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.btn, styles.btnPrimary]} onPress={handleNextSlide}>
                <Text style={styles.btnPrimaryText}>
                  {slideIndex === slides.length - 1 ? "Start Quiz →" : "Next →"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Frame>
    </AppLayout>
  );
};

/* ----------------------------------------
  STYLES
---------------------------------------- */
const styles = StyleSheet.create({
  bg: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
  },
centerArea: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
},

pillRowCentered: {
  flexDirection: "row",
  justifyContent: "center",
  marginBottom: 12,
},
  canvas: { width: "100%", paddingVertical: 8 },

  lessonCard: {
    width: "100%",
    borderRadius: 24,
    padding: 24,
    backgroundColor: "rgba(255,255,255,0.92)",
    borderWidth: 1,
    borderColor: "rgba(15,23,42,0.06)",
    ...(Platform.OS === "web"
      ? { boxShadow: "0 18px 40px rgba(15,23,42,0.18)" }
      : {
          shadowColor: "#000",
          shadowOpacity: 0.16,
          shadowRadius: 20,
          shadowOffset: { width: 0, height: 14 },
          elevation: 6,
        }),
  },

  topBarRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },

  pill: {
    alignSelf: "flex-start",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: "rgba(15,23,42,0.05)",
  },
  pillText: {
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 1.3,
    textTransform: "uppercase",
    opacity: 0.75,
  },

  progressText: { fontWeight: "800", opacity: 0.7 },

  progressTrack: {
    height: 9,
    borderRadius: 999,
    backgroundColor: "rgba(15,23,42,0.08)",
    overflow: "hidden",
    marginTop: 14,
    marginBottom: 18,
  },
  progressFill: {
    height: "100%",
    borderRadius: 999,
    backgroundColor: "#2563EB",
  },

  // Slide Layout
  slideContentRow: {
    marginTop: 4,
    marginBottom: 8,
  },
  slideContentRowWide: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 24,
  },
  slideTextCol: { flex: 1 },
  slideImageCol: { flex: 1, alignItems: "center" },

  illustrationCard: { borderRadius: 32, overflow: "visible", alignItems: "center" },
  illustration: { borderRadius: 32, resizeMode: "cover" },

  captionCard: {
    position: "absolute",
    left: 18,
    right: 18,
    bottom: -30,
    paddingVertical: 12,
    paddingHorizontal: 18,
    backgroundColor: "#2563EB",
    borderRadius: 18,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
  },

  captionWord: { fontSize: 20, fontWeight: "900", color: "#FFF" },
  captionTranslation: { fontSize: 14, marginTop: 4, color: "rgba(255,255,255,0.9)" },

  speakerButton: {
    marginLeft: 12,
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(15,23,42,0.4)",
  },

  bigWord: { fontSize: 40, fontWeight: "900", textAlign: "center", color: "#111", marginTop: 18 },
  subText: { fontSize: 20, textAlign: "center", marginTop: 6, color: "#4B5563" },

  bottomRow: {
    marginTop: 38,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },

  btn: {
    paddingVertical: 11,
    paddingHorizontal: 16,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 120,
  },
  btnGhost: { backgroundColor: "rgba(15,23,42,0.05)", borderWidth: 1, borderColor: "rgba(15,23,42,0.06)" },
  btnGhostText: { fontWeight: "900", color: "#111827", opacity: 0.85 },

  btnPrimary: {
    backgroundColor: "#2563EB",
    ...(Platform.OS === "web" ? { boxShadow: "0 10px 22px rgba(37,99,235,0.35)" } : {}),
  },
  btnPrimaryText: { color: "#FFF", fontWeight: "900", fontSize: 16 },

  // QUIZ
  contentRow: { marginTop: 4, marginBottom: 8 },
  contentRowWide: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 24 },
  leftCol: { flex: 1, paddingRight: 12 },
  rightCol: { flex: 1, alignItems: "center", justifyContent: "center" },

  quizQuestion: { fontSize: 24, fontWeight: "900", textAlign: "center", marginBottom: 16, color: "#111" },

  optionsWrap: { alignItems: "center", gap: 10 },
  optionButton: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "rgba(15,23,42,0.08)",
    borderRadius: 14,
    paddingVertical: 13,
    paddingHorizontal: 14,
    width: 360,
    maxWidth: "100%",
  },
  optionText: { fontSize: 16, fontWeight: "800", textAlign: "center", color: "#111" },

  optCorrect: { backgroundColor: "#7DDA8E" },
  optWrong: { backgroundColor: "#FF6B6B" },

  image: { borderRadius: 24, resizeMode: "cover" },
});

export default Lesson1;
