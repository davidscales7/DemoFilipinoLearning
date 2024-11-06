// FilipinoAccolades.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Lesson {
  question: string;
  options: string[];
  correctAnswer: string;
  image: any;
}

interface FilipinoAccoladesProps {
  progress?: Record<string, number>;  // Made optional
  lessons?: Record<string, Lesson[]>; // Made optional
}

const FilipinoAccolades: React.FC<FilipinoAccoladesProps> = ({
  progress = {}, // Default to an empty object if undefined
  lessons = {},  // Default to an empty object if undefined
}) => {
  const hasProgress = Object.keys(progress).length > 0;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Filipino Accolades</Text>
      {hasProgress ? (
        Object.keys(progress).map((lessonId) => (
          <Text key={lessonId} style={styles.text}>
            Lesson {lessonId}: {progress[lessonId]}/{lessons[lessonId]?.length || 0} completed
          </Text>
        ))
      ) : (
        <Text style={styles.placeholderText}>
          Clicking on Accolades works but nothing is working here yet
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  placeholderText: {
    fontSize: 18,
    fontWeight: 'normal',
    color: '#666',
    marginTop: 20,
  },
});

export default FilipinoAccolades;
