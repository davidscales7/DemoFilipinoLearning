import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import AppLayout from "../../components/Layout/AppLayout";
import LessonLayout from "./LessonLayout";
import { useProgressStore } from "../../store/useProgressStore";
import { useXPStore } from "../../store/useXPStore";
import { useAccoladeStore } from "../../store/useAccoladeStore";
import { RootStackParamList } from "../../navigation/navigation";
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
    english: "Shirt",
    filipino: "Polo",
    sentenceEN: "I am wearing a shirt.",
    sentenceTL: "Nagsusuot ako ng polo.",
    image: require("../../../assets/images/shirt.png"),
  },
  {
    english: "Pants",
    filipino: "Pantalon",
    sentenceEN: "I am wearing pants.",
    sentenceTL: "Nagsusuot ako ng pantalon.",
    image: require("../../../assets/images/pants.png"),
  },
  {
    english: "Shoes",
    filipino: "Sapatos",
    sentenceEN: "I am wearing shoes.",
    sentenceTL: "Nagsusuot ako ng sapatos.",
    image: require("../../../assets/images/shoes.png"),
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
    console.log("🏁 FINISH LESSON 6 - Returning to lessons");
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
 
 <Text>You can now talk about clothes in Filipino.</Text>

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
        <View style={styles.card}>
          <Image 
          source={current.image} 
          style={styles.image}
          resizeMode="contain"/>

          {stage === "word" ? (
            <>
              <Text style={styles.title}>{current.filipino}</Text>
              <Text>{current.english}</Text>
            </>
          ) : (
            <>
              <Text style={styles.title}>{current.sentenceTL}</Text>
              <Text>{current.sentenceEN}</Text>
            </>
          )}
        </View>

          {/* Next Button */}
        <TouchableOpacity style={styles.button} onPress={next}>
          <Text style={styles.buttonText}>Next →</Text>
        </TouchableOpacity>

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
      card: {
        backgroundColor: "white",
        borderRadius: 20,
        padding: 24,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 10,
        elevation: 5,
        marginBottom: 20,
      },
      image: {
        width: 120,
        height: 120,
        marginBottom: 16,
      },
      title: {
        fontSize: 24,
        fontWeight: "800",
        marginBottom: 8,
        textAlign: "center",
      },
      filipino: {
        fontSize: 20,
        fontWeight: "600",
        color: "#2563EB",
        marginVertical: 8,
        textAlign: "center",
      },
      sentenceEN: {
        fontSize: 18,
        fontWeight: "600",
        textAlign: "center",
        marginBottom: 6,
      },
      sentenceTL: {
        fontSize: 16,
        textAlign: "center",
        color: "#2563EB",
      },
      button: {
        marginTop: 20,
        paddingVertical: 12,
        paddingHorizontal: 24,
        backgroundColor: "#2563EB",
        borderRadius: 14,
        alignSelf: "center",
      },
      buttonText: {
        color: "#FFF",
        fontWeight: "700",
        textAlign: "center",
        fontSize: 16,
      },
      text: {
        fontSize: 16,
        textAlign: "center",
        marginBottom: 12,
        marginTop: 8,
      },
      progress: {
        textAlign: "center",
        marginTop: 16,
        color: "#6B7280",
        fontSize: 14,
      },
    });
    
    export default Lesson7;