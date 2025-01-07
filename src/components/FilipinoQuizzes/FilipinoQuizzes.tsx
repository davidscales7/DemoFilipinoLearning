import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
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
    <View style={styles.background}>
      {/* Back Button */}
      <TouchableOpacity
        onPress={() => navigation.navigate('Filipino')} // Navigate to 'Filipino'
        style={styles.backButton}
      >
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
  
      {/* Main Content */}
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.titleText}>Filipino Quizzes</Text>
  
        <View style={styles.flashcardsContainer}>
          {quizzes.map((quiz, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.row, styles.box]}
              onPress={() => handleNavigateToQuiz(quiz.screen as keyof RootStackParamList)}
            >
              <Text style={styles.categoriesText}>{quiz.name}</Text>
              <Image source={quiz.image} style={styles.image} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};  


const quizzes = [
  { name: 'Quiz 1: Greetings', image: require('../../../assets/images/hello.png'), screen: 'Quiz1' },
  { name: 'Quiz 2: Numbers', image: require('../../../assets/images/number1.jpg'), screen: 'Quiz2' },
  { name: 'Quiz 3: Family', image: require('../../../assets/images/family.jpg'), screen: 'Quiz3' },
  { name: 'Quiz 4: Colours', image: require('../../../assets/images/Colours.jpg'), screen: 'Quiz4' },
  { name: 'Quiz 5: Animals', image: require('../../../assets/images/Animals.jpg'), screen: 'Quiz5' },
  { name: 'Quiz 6: Food and Drink', image: require('../../../assets/images/FoodAndDrink.jpg'), screen: 'Quiz6' },
  { name: 'Quiz 7: Clothes', image: require('../../../assets/images/Clothes.jpg'), screen: 'Quiz7' },
  { name: 'Quiz 8: Hobbies', image: require('../../../assets/images/hobbies.jpg'), screen: 'Quiz8' },
  { name: 'Quiz 9: Basic Sentence Structure', image: require('../../../assets/images/sentenceStructure.jpg'), screen: 'Quiz9' },
  { name: 'Quiz 10: Part 1 Test', image: require('../../../assets/images/test1.jpg'), screen: 'Quiz10' },
];

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: 20,
    left: 10,
    padding: 10,
    backgroundColor: 'rgba(255, 0, 0, 0.5)',
    borderRadius: 5,
    zIndex: 10,
  },
  backButtonText: {
    color: '#FFFFFF', // White text
    fontSize: 18,
    fontWeight: 'bold',
  },
  background: {
    flex: 1,
    backgroundColor: '#6489bd',
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  titleText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
    textAlign: 'center',
  },
  categoriesText: {
    fontSize: 20,
    marginVertical: 10,
    color: '#fff',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  image: {
    width: 50,
    height: 50,
    marginLeft: 10,
  },
  box: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  flashcardsContainer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
});

export default FilipinoQuizzes;
