import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import AppLayout from "../../components/Layout/AppLayout";
import LessonLayout from "./LessonLayout";
import { useProgressStore } from "../../store/useProgressStore";
import { useXPStore } from "../../store/useXPStore";
import { useAccoladeStore } from "../../store/useAccoladeStore";
import type { RootStackParamList } from "../../navigation/navigation";
import { DEMO_ACCOLADES } from "../demo/DemoAccolades";

/* ----------------------------------------
   TYPES
---------------------------------------- */
type Nav = StackNavigationProp<RootStackParamList, "FilipinoLearning">;

/* ----------------------------------------
   DATA
---------------------------------------- */

const CLOTHES = [
 {
    english: "Red Shirt",
    filipino: "Pulang Polo",
    sentenceEN: "I am wearing a red shirt.",
    sentenceTL: "Nagsusuot ako ng pulang polo.",
    image: require("../../../assets/images/red_shirt.jpg"),
  },
  {
    english: "Blue Pants",
    filipino: "Asul na Pantalon",
    sentenceEN: "I am wearing blue pants.",
    sentenceTL: "Nagsusuot ako ng asul na pantalon.",
    image: require("../../../assets/images/blue_pants.jpg"),
  },
  {
    english: "Black Shoes",
    filipino: "Itim na Sapatos",
    sentenceEN: "I am wearing black shoes.",
    sentenceTL: "Nagsusuot ako ng itim na sapatos.",
    image: require("../../../assets/images/black_shoes.jpg"),
  },
  {
    english: "White Socks",
    filipino: "Puting Medyas",
    sentenceEN: "I am wearing white socks.",
    sentenceTL: "Nagsusuot ako ng puting medyas.",
    image: require("../../../assets/images/white_socks.jpg"),
  },
  {
    english: "Yellow Hat",
    filipino: "Dilaw na Sombrero",
    sentenceEN: "I am wearing a yellow hat.",
    sentenceTL: "Nagsusuot ako ng dilaw na sombrero.",
    image: require("../../../assets/images/yellow_hat.jpg"),
  },
  {
    english: "Orange Scarf",
    filipino: "Kahel na Scarf",
    sentenceEN: "I am wearing an orange scarf.",
    sentenceTL: "Nagsusuot ako ng kahel na scarf.",
    image: require("../../../assets/images/orange_scarf.jpg"),
  },
  {
    english: "Pink Gloves",
    filipino: "Rosang Guwantes",
    sentenceEN: "I am wearing pink gloves.",
    sentenceTL: "Nagsusuot ako ng rosang guwantes.",
    image: require("../../../assets/images/pink_gloves.jpg"),
  },
  {
    english: "Purple Jacket",
    filipino: "Lilang Dyaket",
    sentenceEN: "I am wearing a purple jacket.",
    sentenceTL: "Nagsusuot ako ng lilang dyaket.",
    image: require("../../../assets/images/purple_jacket.jpg"),
  },
  {
    english: "Green Dress",
    filipino: "Berdeng Bestida",
    sentenceEN: "I am wearing a green dress.",
    sentenceTL: "Nagsusuot ako ng berdeng bestida.",
    image: require("../../../assets/images/green_dress.jpg"),
  },
  {
    english: "Brown Belt",
    filipino: "Kayumangging Sinturon",
    sentenceEN: "I am wearing a brown belt.",
    sentenceTL: "Nagsusuot ako ng kayumangging sinturon.",
    image: require("../../../assets/images/brown_belt.jpg"),
  },
];

const XP_PER_ITEM = 15;

/* ---------------- COMPONENT ---------------- */

const Lesson7: React.FC = () => {
  const navigation = useNavigation<Nav>();

  const addXP = useXPStore((s) => s.addXP);
  const completeLesson = useProgressStore((s) => s.completeLesson);
  const unlockAccolade = useAccoladeStore((s) => s.unlockAccolade);

  const [index, setIndex] = useState(0);
  const [stage, setStage] = useState<"word" | "sentence" | "summary">("word");

  const current = CLOTHES[index];
  /* ----------------------------------------
     MARK COMPLETE & UNLOCK ACCOLADE
  ---------------------------------------- */
  useEffect(() => {
    if (stage === "summary") {
      console.log("🎉 LESSON 7 COMPLETED")
      completeLesson(7);
      unlockAccolade(DEMO_ACCOLADES.LESSONS.LESSON_7);
    }
  }, [stage, completeLesson, unlockAccolade]);


  const next = () => {
    console.log("➡️ NEXT PRESSED");
    console.log("Index:", index, "Stage:", stage);

    addXP(XP_PER_ITEM);
    console.log("✅ XP ADDED:", XP_PER_ITEM);

    if (stage === "word") {
      setStage("sentence");
      return;
    }

    if (index < CLOTHES.length - 1) {
      setIndex(index + 1);
      setStage("word");
      return;
    }

    console.log("🎉 ALL CLOTHING ITEMS COMPLETED");
    setStage("summary");
  };

  const finishLesson = () => {
    console.log("🏁 FINISH LESSON 7 - Returning to lessons");
    navigation.navigate("FilipinoLessons");
  };

 /* ----------------------------------------
     SUMMARY SCREEN
  ---------------------------------------- */
  
if (stage === "summary") {

  return (
    <AppLayout title="Lesson 7 — Clothes">
      <LessonLayout lessonNumber={7} mode="summary">
        <Text style={styles.title}>Great job! 🎉</Text>
        <Text style={styles.body}>You can now talk about clothes in Filipino.</Text>

        <TouchableOpacity style={styles.button} onPress={finishLesson}>
          <Text style={styles.buttonText}>Back to Lessons</Text>
        </TouchableOpacity>
      </LessonLayout>
    </AppLayout>
  );
}

/* ----------------------------------------
     LESSON CONTENT
  ---------------------------------------- */       
   return (
    <AppLayout title="Lesson 7 — Clothes">
      <LessonLayout lessonNumber={7}
      mode="lesson"
      step ={index + 1}
      total={CLOTHES.length}
      >
        {/*card*/}
        <View style={styles.contentCard}>
          <Image 
          source={current.image} 
          style={styles.image}
          resizeMode="contain"/>

          {stage === "word" ? (
            <>
              <Text style={styles.title}>{current.filipino}</Text>
              <View style={styles.translationContainer}>
                <Text style={styles.english}>{current.english}</Text>
              </View>
            </>
          ) : (
            <>
              <Text style={styles.sentenceTL}>{current.sentenceTL}</Text>
              <View style={styles.translationContainer}>
                <Text style={styles.sentenceEN}>{current.sentenceEN}</Text>
              </View>
            </>
          )}

          <TouchableOpacity style={styles.button} onPress={next}>
            <Text style={styles.buttonText}>Next →</Text>
          </TouchableOpacity>
        </View>

        {/* Progress Indicator */}
        <Text style={styles.progress}>
          Item {index + 1} / {CLOTHES.length}
        </Text>
      </LessonLayout>
    </AppLayout>

        )
        };
    /* ----------------------------------------
       STYLES
    ---------------------------------------- */
    const styles = StyleSheet.create({
      contentCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        padding: 40,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 5,
        maxWidth: 500,
        width: "100%",
        alignSelf: "center",
        marginVertical: 20,
      },
      image: {
        width: 200,
        height: 200,
        marginBottom: 24,
      },
      title: {
        fontSize: 42,
        fontWeight: "800",
        marginBottom: 16,
        textAlign: "center",
        color: "#2563EB",
      },
      body: {
        textAlign: "center",
        fontSize: 16,
        marginBottom: 24,
      },
      english: {
        fontSize: 20,
        fontWeight: "600",
        color: "#4B5563",
        textAlign: "center",
      },
      sentenceEN: {
        fontSize: 18,
        fontWeight: "600",
        textAlign: "center",
        color: "#4B5563",
      },
      sentenceTL: {
        fontSize: 22,
        fontWeight: "700",
        textAlign: "center",
        marginBottom: 16,
        color: "#2563EB",
      },
      translationContainer: {
        backgroundColor: "#F3F4F6",
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 12,
        marginVertical: 12,
      },
      button: {
        marginTop: 32,
        paddingVertical: 18,
        paddingHorizontal: 60,
        backgroundColor: "#2563EB",
        borderRadius: 12,
        shadowColor: "#2563EB",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
        minWidth: 160,
      },
      buttonText: {
        color: "#FFF",
        fontWeight: "700",
        textAlign: "center",
        fontSize: 18,
      },
      progress: {
        textAlign: "center",
        marginTop: 16,
        color: "#6B7280",
        fontSize: 14,
      },
    });
    
    export default Lesson7;