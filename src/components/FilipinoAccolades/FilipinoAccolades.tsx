import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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



interface FilipinoAccoladesProps {
  progress?: Record<string, number>; // Optional
  lessons?: Record<string, Lesson[]>; // Optional
  quizs?: Record<string,Quiz[]>;
}

const FilipinoAccolades: React.FC<FilipinoAccoladesProps> = ({
  progress = {}, // Default to empty object
  lessons = {}, // Default to empty object
  quizs ={},
}) => {
  const [accolades, setAccolades] = useState<string[]>([]);
const [quizAccolades, setQuizAccolades] = useState<string[]>([]);
  
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
    fetchAccolades();
    fetchQuizAccolades();
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
      <Text style={styles.text}>Filipino Accolades</Text>
      {accolades.length > 0 ? (
        accolades.map((accolade, index) => (
          <Text key={index} style={styles.accoladeText}>
            {index + 1}. {accolade}
          </Text>
        ))
      ) : (
        <Text style={styles.placeholderText}>No accolades earned yet!</Text>
      )}
      {Object.keys(progress).map((lessonId) => (
        <Text key={lessonId} style={styles.progressText}>
          Lesson {lessonId}: {progress[lessonId]}/{lessons[lessonId]?.length || 0} completed
        </Text>

      ))}


        {quizAccolades.map((quizAccolade, index) => (
          <Text key={index} style={styles.accoladeText}>
            {index + 1}. {quizAccolade}
          </Text>
        ))}

      {Object.keys(progress).map((quizId) => (
        <Text key={quizId} style={styles.progressText}>
          Quiz {quizId}: {progress[quizId]}/{quizs[quizId]?.length || 0} completed
        </Text>

         ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  accoladeText: {
    fontSize: 18,
    color: '#555',
    marginVertical: 5,
  },
  placeholderText: {
    fontSize: 18,
    fontWeight: 'normal',
    color: '#666',
    marginTop: 20,
  },
  progressText: {
    fontSize: 16,
    color: '#333',
    marginVertical: 5,
  },
  errorText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red',
  },
});

export default FilipinoAccolades;
