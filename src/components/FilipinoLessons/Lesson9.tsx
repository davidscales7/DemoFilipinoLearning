import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Lesson9: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "Subject-Verb-Object (SVO) Structure",
      content: `
        In Filipino, sentences typically follow the Subject-Verb-Object (SVO) structure. 
        This means the subject comes first, followed by the verb, and then the object.
        For example:
          'Ako ay masaya.' means 'I am happy.'
          'Sila ay mabuti.' means 'They are good.'
      `,
      examples: [
        "Ako ay masaya. (I am happy.)",
        "Ikaw ay malungkot. (You are sad.)",
        "Sila ay mabuti. (They are good.)",
        "Si Juan ay nagbabasa ng libro. (Juan is reading a book.)",
      ],
      activity: `
        Translate the following sentences into Filipino:
        1. I am reading a book.
        2. She is singing a song.
        3. They are playing soccer.
      `,
    },
    {
      title: "Negation (Pagsalungat)",
      content: `
        To negate a sentence in Filipino, you use the word 'hindi' before the adjective or verb. 
        This changes the meaning of the sentence to a negative one.
        For example:
          'Ako ay hindi masaya.' means 'I am not happy.'
          'Ikaw ay hindi mabuti.' means 'You are not good.'
      `,
      examples: [
        "Ako ay hindi malungkot. (I am not sad.)",
        "Ikaw ay hindi masaya. (You are not happy.)",
        "Sila ay hindi naglalaro. (They are not playing.)",
        "Juan ay hindi nagbabasa ng libro. (Juan is not reading a book.)",
      ],
      activity: `
        Turn the following positive sentences into negative ones:
        1. I am happy.
        2. You are good.
        3. They are playing.
      `,
    },
    {
      title: "Questions with SVO Structure",
      content: `
        In Filipino, forming a question can be done by adding a question word (e.g., 'Ano' or 'Saan') at the start of the sentence.
        For example:
          'Ano ang ginagawa mo?' means 'What are you doing?'
          'Saan ka pupunta?' means 'Where are you going?'
      `,
      examples: [
        "Ano ang ginagawa mo? (What are you doing?)",
        "Saan siya pupunta? (Where is he/she going?)",
        "Kailan tayo kakain? (When will we eat?)",
        "Paano nila ginagawa ito? (How are they doing this?)",
      ],
      activity: `
        Translate the following questions into Filipino:
        1. What are you eating?
        2. Where are they going?
        3. How is she feeling?
      `,
    },
    {
      title: "Practice Sentences",
      content: `
        Practice rearranging words to form grammatically correct sentences. 
        For example:
          'malungkot / Ako / ay' → 'Ako ay malungkot.'
      `,
      examples: [
        "Rearrange: 'masaya / Ikaw / ay' → Correct: 'Ikaw ay masaya.'",
        "Rearrange: 'nagbabasa / Si Juan / ng libro / ay' → Correct: 'Si Juan ay nagbabasa ng libro.'",
      ],
      activity: `
        Rearrange these words to form correct sentences:
        1. 'ay / Si Ana / nagluluto / ng pagkain'
        2. 'naglalaro / Ay / Sila / soccer'
        3. 'Ako / ay / hindi / malungkot'
      `,
    },
    {
      title: "Sentence Variations",
      content: `
        You can add more variety to Filipino sentences by using descriptive phrases, prepositions, or additional details.
        For example:
          'Si Maria ay nag-aaral sa eskuwelahan.' means 'Maria is studying at the school.'
          'Si Pedro ay kumakain ng mansanas sa kusina.' means 'Pedro is eating an apple in the kitchen.'
      `,
      examples: [
        "Si Juan ay naglalakad sa parke. (Juan is walking in the park.)",
        "Ang aso ay natutulog sa ilalim ng mesa. (The dog is sleeping under the table.)",
        "Kami ay naglalaro sa hardin. (We are playing in the garden.)",
      ],
      activity: `
        Translate the following into Filipino:
        1. She is reading a book in the library.
        2. The children are playing in the park.
        3. I am eating lunch in the dining room.
      `,
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  return (
    <LinearGradient colors={['#FFDEE9', '#B5FFFC']} style={styles.container}>
      {currentStep < steps.length ? (
        <View style={styles.card}>
          <Text style={styles.title}>{steps[currentStep].title}</Text>
          <Text style={styles.content}>{steps[currentStep].content}</Text>
          {steps[currentStep].examples.map((example, index) => (
            <Text key={index} style={styles.example}>{example}</Text>
          ))}
          <TouchableOpacity onPress={handleNext} style={styles.nextButton}>
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.card}>
          <Text style={styles.congratulationsText}>🎉 Congratulations! 🎉</Text>
          <Text style={styles.content}>
            You have successfully completed Lesson 9! Great job applying what you've learned about Filipino sentence structure and grammar.
          </Text>
        </View>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: { padding: 20, backgroundColor: 'white', borderRadius: 10, alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  content: { fontSize: 18, marginBottom: 10, textAlign: 'center' },
  example: { fontSize: 16, fontStyle: 'italic', marginBottom: 5 },
  nextButton: { marginTop: 20, padding: 10, backgroundColor: 'blue', borderRadius: 5 },
  nextButtonText: { color: 'white', fontSize: 16 },
  congratulationsText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'green',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default Lesson9;
