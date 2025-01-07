import React, { useEffect, useState, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './../../navigation/navigation';

type NavigationProp = StackNavigationProp<RootStackParamList, 'FilipinoAccolades'>;

interface Lesson {
  question: string;
  options: string[];
  correctAnswer: string;
  image: any;
}

interface Quiz {
  question: string;
  options: string[];
  correctAnswer: string;
  image: any;
}

interface FlashCard {
  question: string;
  options: string[];
  correctAnswer: string;
  image: any;
}

interface FilipinoAccoladesProps {
  progress?: Record<string, number>; // Optional
  lessons?: Record<string, Lesson[]>; // Optional
  quizs?: Record<string, Quiz[]>;
  flashCards?: Record<string, FlashCard[]>;
}

const FilipinoAccolades: React.FC<FilipinoAccoladesProps> = ({
  progress = {}, // Default to empty object
  lessons = {},
  quizs = {},
  flashCards = {},
}) => {
  const navigation = useNavigation<NavigationProp>();

  // Move useLayoutEffect inside the component
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

  const [accolades, setAccolades] = useState<string[]>([]);
  const [quizAccolades, setQuizAccolades] = useState<string[]>([]);
  const [flashCardAccolades, setFlashCardAccolades] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAccolades = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          setError('User not logged in');
          setLoading(false);
          return;
        }

        const response = await fetch('http://localhost:3000/accolades', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch accolades');
        }

        const data = await response.json();
        setAccolades(data.accolades || []);
      } catch (err) {
        setError(err.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    const fetchQuizAccolades = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          setError('User not logged in');
          setLoading(false);
          return;
        }

        const response = await fetch('http://localhost:3000/quizAccolades', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch accolades');
        }

        const data = await response.json();
        setQuizAccolades(data.quizAccolades || []);
      } catch (err) {
        setError(err.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    const fetchFlashCardAccolades = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          setError('User not logged in');
          setLoading(false);
          return;
        }

        const response = await fetch('http://localhost:3000/flashCardAccolades', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch accolades');
        }

        const data = await response.json();
        setFlashCardAccolades(data.flashCardAccolades || []);
      } catch (err) {
        setError(err.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchAccolades();
    fetchQuizAccolades();
    fetchFlashCardAccolades();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.text}>Loading accolades...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.text}>Accolades</Text>

        {accolades.length > 0 &&
          accolades.map((accolade, index) => (
            <View key={index} style={[styles.accoladeBox, styles.lessonBox]}>
              <Text style={styles.accoladeText}>{accolade}</Text>
            </View>
          ))}

        {quizAccolades.map((quizAccolade, index) => (
          <View key={index} style={[styles.accoladeBox, styles.quizBox]}>
            <Text style={styles.accoladeText}>{quizAccolade}</Text>
          </View>
        ))}

        {flashCardAccolades.map((flashCardAccolade, index) => (
          <View key={index} style={[styles.accoladeBox, styles.flashCardBox]}>
            <Text style={styles.accoladeText}>{flashCardAccolade}</Text>
          </View>
        ))}

        {Object.keys(progress).map((lessonId) => (
          <View key={lessonId} style={[styles.accoladeBox, styles.lessonBox]}>
            <Text style={styles.progressText}>
              Lesson {lessonId}: {progress[lessonId]}/{lessons[lessonId]?.length || 0} completed
            </Text>
          </View>
        ))}

        {Object.keys(progress).map((quizId) => (
          <View key={quizId} style={[styles.accoladeBox, styles.quizBox]}>
            <Text style={styles.progressText}>
              Quiz {quizId}: {progress[quizId]}/{quizs[quizId]?.length || 0} completed
            </Text>
          </View>
        ))}

        {Object.keys(progress).map((flashCardId) => (
          <View key={flashCardId} style={[styles.accoladeBox, styles.flashCardBox]}>
            <Text style={styles.progressText}>
              Flash Card {flashCardId}: {progress[flashCardId]}/{flashCards[flashCardId]?.length || 0} completed
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
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
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  scrollContainer: {
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  accoladeBox: {
    width: '90%',
    marginVertical: 10,
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  lessonBox: {
    backgroundColor: '#d1e7dd', // Greenish for lessons
  },
  quizBox: {
    backgroundColor: '#f8d7da', // Reddish for quizzes
  },
  flashCardBox: {
    backgroundColor: '#cff4fc', // Blueish for flashcards
  },
  accoladeText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },
  progressText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  errorText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red',
  },
});

export default FilipinoAccolades;
