import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/navigation';

type LessonsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'FilipinoLessons'>;

const FilipinoQuizzes: React.FC = () => {
  const navigation = useNavigation<LessonsScreenNavigationProp>();

  const handleNavigateToLesson = (lesson: keyof RootStackParamList) => {
    navigation.navigate(lesson as any);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titleText}>Filipino Quiz</Text>
      
      {Array.from({ length: 10 }, (_, i) => (
        <TouchableOpacity
          key={i}
          style={styles.lessonButton}
          onPress={() => handleNavigateToLesson(`Quiz${i + 1}` as keyof RootStackParamList)}
        >
          <Text style={styles.lessonText}>Quiz {i + 1}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    paddingVertical: 20,
  },
  titleText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  lessonButton: {
    width: '80%',
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    alignItems: 'center',
  },
  lessonText: {
    fontSize: 20,
    color: '#fff',
  },
});

export default FilipinoQuizzes;
