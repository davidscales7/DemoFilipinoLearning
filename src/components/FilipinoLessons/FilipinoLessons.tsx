import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './../../navigation/navigation';

type LessonsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'FilipinoLessons'>;

const FilipinoLessons: React.FC = () => {
  const navigation = useNavigation<LessonsScreenNavigationProp>();

  // Customize the header for this screen
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

  const handleNavigateToLesson = (screen: keyof RootStackParamList) => {
    navigation.navigate(screen as any);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titleText}>Filipino Lessons</Text>

      {lessons.map((lesson, index) => (
        <TouchableOpacity
          key={index}
          style={styles.lessonButton}
          onPress={() => handleNavigateToLesson(lesson.screen as keyof RootStackParamList)}
        >
          <Image source={lesson.image} style={styles.lessonImage} />
          <View style={styles.lessonContent}>
            <Text style={styles.lessonText}>{lesson.name}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  backButton: {
    backgroundColor: 'rgba(255, 0, 0, 0.7)', // Red with some transparency
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginLeft: 10, // Align it nicely in the header
  },
  backButtonText: {
    color: '#FFFFFF', // White text color
    fontSize: 18,
    fontWeight: 'bold',
  },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6489bd',
    paddingVertical: 40,
  },
  titleText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  lessonButton: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginVertical: 10,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5, // For Android shadow
  },
  lessonImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 15,
  },
  lessonContent: {
    flex: 1,
    justifyContent: 'center',
  },
  lessonText: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
  },
  
});

export default FilipinoLessons;
