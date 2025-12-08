import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './../navigation/navigation';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const FilipinoLearning: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [accolades, setAccolades] = useState({
    lessons: [],
    quizzes: [],
    flashcards: [],
  });

  // Load LOCAL dummy accolades instead of API + token
  useEffect(() => {
    setAccolades({
      lessons: [{ id: 1 }, { id: 2 }],
      quizzes: [{ id: 1 }],
      flashcards: [{ id: 1 }, { id: 2 }, { id: 3 }],
    });
  }, []);

  const handleNavigate = (screen: keyof RootStackParamList) => {
    navigation.navigate(screen as any);
  };

  return (
    <View style={styles.background}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          <Text style={styles.titleText}>Filipino Learning</Text>

          {/* Accolades Section */}
          <View style={styles.accoladesContainer}>
            <Text style={styles.accoladesTitle}>Your Progress:</Text>

            <View style={[styles.accoladeBox, styles.lessonBox]}>
              <Text style={styles.accoladesText}>
                Lessons Completed: {accolades.lessons.length}
              </Text>
            </View>

            <View style={[styles.accoladeBox, styles.quizBox]}>
              <Text style={styles.accoladesText}>
                Quizzes Completed: {accolades.quizzes.length}
              </Text>
            </View>

            <View style={[styles.accoladeBox, styles.flashcardBox]}>
              <Text style={styles.accoladesText}>
                Flashcards Completed: {accolades.flashcards.length}
              </Text>
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
});

export default FilipinoLearning;
