import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './../navigation/navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const FilipinoLearning: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [accolades, setAccolades] = useState({
    lessons: [],
    quizzes: [],
    flashcards: [],
  });

  // Fetch accolades and progress on mount
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
        setAccolades({
          lessons: data.accolades || [],
          quizzes: data.quizAccolades || [],
          flashcards: data.flashCardAccolades || [],
        });
      } catch (err) {
        setError(err.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchAccolades();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token'); // Remove the stored token
      navigation.navigate('Login'); // Redirect to the login screen
    } catch (err) {
      console.error('Failed to logout:', err);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.text}>Loading progress...</Text>
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

  const handleNavigate = (screen: keyof RootStackParamList) => {
    navigation.navigate(screen as any);
  };

  return (
    <View style={styles.background}>
      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          <Text style={styles.titleText}>Filipino Learning</Text>

          {/* Accolades Section */}
          <View style={styles.accoladesContainer}>
            <Text style={styles.accoladesTitle}>Your Progress:</Text>
            
            {/* Lessons Progress */}
            <View style={[styles.accoladeBox, styles.lessonBox]}>
              <Text style={styles.accoladesText}>Lessons Completed: {accolades.lessons.length}</Text>
            </View>

            {/* Quizzes Progress */}
            <View style={[styles.accoladeBox, styles.quizBox]}>
              <Text style={styles.accoladesText}>Quizzes Completed: {accolades.quizzes.length}</Text>
            </View>

            {/* Flashcards Progress */}
            <View style={[styles.accoladeBox, styles.flashcardBox]}>
              <Text style={styles.accoladesText}>Flashcards Completed: {accolades.flashcards.length}</Text>
            </View>
          </View>

          {/* Navigation Buttons */}
          <View style={styles.gridContainer}>
            <TouchableOpacity
              style={[styles.gridItem, styles.box]}
              onPress={() => handleNavigate('FilipinoFlashHome')}
            >
              <Text style={styles.categoriesText}>Flashcards</Text>
              <Image
                source={require('../../assets/images/flashcards.jpg')}
                style={styles.image}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.gridItem, styles.box]}
              onPress={() => handleNavigate('FilipinoQuizzes')}
            >
              <Text style={styles.categoriesText}>Quizzes</Text>
              <Image
                source={require('../../assets/images/quizzes.jpg')}
                style={styles.image}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.gridItem, styles.box]}
              onPress={() => handleNavigate('FilipinoLessons')}
            >
              <Text style={styles.categoriesText}>Lessons</Text>
              <Image
                source={require('../../assets/images/lessons.jpg')}
                style={styles.image}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.gridItem, styles.box]}
              onPress={() => handleNavigate('FilipinoAccolades')}
            >
              <Text style={styles.categoriesText}>Accolades</Text>
              <Image
                source={require('../../assets/images/accolades.jpg')}
                style={styles.image}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  background: {
    flex: 1,
    backgroundColor: '#6489bd',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  gridItem: {
    width: '40%',
    alignItems: 'center',
    marginBottom: 20,
  },
  box: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
    width: 150,
    height: 150,
    margin: 10,
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  accoladesContainer: {
    marginBottom: 20,
  },
  accoladesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
  },
  accoladeBox: {
    width: '90%',
    marginVertical: 5,
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
  },
  lessonBox: {
    backgroundColor: '#d1e7dd',
  },
  quizBox: {
    backgroundColor: '#f8d7da',
  },
  flashcardBox: {
    backgroundColor: '#cff4fc',
  },
  accoladesText: {
    fontSize: 16,
    color: '#333',
  },
  categoriesText: {
    fontSize: 20,
    marginVertical: 10,
    color: '#333',
    textAlign: 'center',
  },
  logoutButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    padding: 10,
    backgroundColor: 'rgba(255, 0, 0, 0.7)', // Red background
    borderRadius: 5,
    zIndex: 10,
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
});

export default FilipinoLearning;
