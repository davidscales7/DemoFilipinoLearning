import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './../../navigation/navigation';

type LessonsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'FilipinoLessons'>;

const FilipinoLessons: React.FC = () => {
  const navigation = useNavigation<LessonsScreenNavigationProp>();

  // Customize or remove the header title
  

  const handleNavigateToLesson = (screen: keyof RootStackParamList) => {
    navigation.navigate(screen as any);
  };

  return (
    <View style={styles.background}>
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate('Filipino')} // Navigate to 'Filipino'
      >
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <ScrollView style={styles.scrollViewContent}>
        <View style={styles.container}>
          <Text style={styles.titleText}>Filipino Lessons</Text>
        </View>

        <View style={styles.flashcardsContainer}>
          {lessons.map((lesson, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.row, styles.box]}
              onPress={() => handleNavigateToLesson(lesson.screen as keyof RootStackParamList)}
            >
              <Text style={styles.categoriesText}>{lesson.name}</Text>
              <Image source={lesson.image} style={styles.image} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const lessons = [
  { name: 'Greetings', image: require('../../../assets/images/hello.png'), screen: 'Lesson1' },
  { name: 'Numbers', image: require('../../../assets/images/number1.jpg'), screen: 'Lesson2' },
  { name: 'Family', image: require('../../../assets/images/family.jpg'), screen: 'Lesson3' },
  { name: 'Colours', image: require('../../../assets/images/Colours.jpg'), screen: 'Lesson4' },
  { name: 'Animals', image: require('../../../assets/images/Animals.jpg'), screen: 'Lesson5' },
  { name: 'Food and Drink', image: require('../../../assets/images/FoodAndDrink.jpg'), screen: 'Lesson6' },
  { name: 'Clothes', image: require('../../../assets/images/Clothes.jpg'), screen: 'Lesson7' },
  { name: 'Hobbies', image: require('../../../assets/images/hobbies.jpg'), screen: 'Lesson8' },
  { name: 'Basic Sentence Structure', image: require('../../../assets/images/sentenceStructure.jpg'), screen: 'Lesson9' },
  { name: 'Part 1 test', image: require('../../../assets/images/test1.jpg'), screen: 'Lesson10' },
];

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    backgroundColor: '#6489bd',
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
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
  background: {
    flex: 1,
    backgroundColor: '#6489bd',
  },
  box: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  flashcardsContainer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
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
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default FilipinoLessons;
