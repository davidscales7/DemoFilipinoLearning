import React , { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './../../navigation/navigation';

type QuizzesScreenNavigationProp = StackNavigationProp<RootStackParamList, 'FilipinoQuizzes'>;

const FilipinoQuizzes: React.FC = () => {
  const navigation = useNavigation<QuizzesScreenNavigationProp>();

  const handleNavigateToQuiz = (quiz: keyof RootStackParamList) => {
    navigation.navigate(quiz as any);
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Filipino')} style={styles.backButton}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      ),
      headerTitle: '', // Keep the title empty
    });
  }, [navigation]);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titleText}>Filipino Quizzes</Text>

      {Array.from({ length: 10 }, (_, i) => (
        <TouchableOpacity
          key={i}
          style={styles.quizButton}
          onPress={() => handleNavigateToQuiz(`Quiz${i + 1}` as keyof RootStackParamList)}
        >
          <Text style={styles.quizText}>Quiz {i + 1}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  backButton: {
    backgroundColor: 'rgba(255, 0, 0, 0.7)', // Red background
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginLeft: 10, // Position within the header
  },
  backButtonText: {
    color: '#FFFFFF', // White text
    fontSize: 18,
    fontWeight: 'bold',
  },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#6489bd',
    paddingVertical: 20,
  },
  titleText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  quizButton: {
    width: '80%',
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#2196F3',
    borderRadius: 10,
    alignItems: 'center',
  },
  quizText: {
    fontSize: 20,
    color: '#fff',
  },
});

export default FilipinoQuizzes;
