import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './../navigation/navigation';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const FilipinoLearning: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [showFlashcards, setShowFlashcards] = useState(false);

 

  const handleNavigateToFlashCardsScreen = () => {
    navigation.navigate('FilipinoFlashHome');
  };

  const handleNavigateToQuizzesScreen = () => {
    navigation.navigate('FilipinoQuizzes');
  };

  const handleNavigateToLessonsScreen = () => {
    navigation.navigate('FilipinoLessons');
  };

 


  const handleNavigateToAccoladesScreen = () => {
    navigation.navigate('FilipinoAccolades');
  };





  return (
<View style={styles.background}>
  <ScrollView contentContainerStyle={styles.scrollViewContent}>
    <View style={styles.container}>
      <Text style={styles.titleText}>Filipino Learning</Text>


          <View style={styles.gridContainer}>
            <TouchableOpacity 
              style={[styles.gridItem, styles.box]} 
              onPress={handleNavigateToFlashCardsScreen}
            >
              <Text style={styles.categoriesText}>Flashcards</Text>
              <Image 
                source={require('../../assets/images/flashcards.jpg')}
                style={styles.image}
              />
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.gridItem, styles.box]} 
              onPress={handleNavigateToQuizzesScreen}
            >
              <Text style={styles.categoriesText}>Quizzes</Text>
              <Image 
                source={require('../../assets/images/quizzes.jpg')}
                style={styles.image}
              />
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.gridItem, styles.box]} 
              onPress={handleNavigateToLessonsScreen}
            >
              <Text style={styles.categoriesText}>Lessons</Text>
              <Image 
                source={require('../../assets/images/lessons.jpg')}
                style={styles.image}
              />
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.gridItem, styles.box]} 
              onPress={handleNavigateToAccoladesScreen}
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
    flex:1,
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
  categoriesText: {
    fontSize: 20,
    marginVertical: 10,
    color: '#333',
    textAlign: 'center',
  },
  background: {
    flex: 1,
    backgroundColor: '#6489bd', // Light Grey or any other chosen color

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
  flashcardsContainer: {
    alignItems: 'center',
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
  
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default FilipinoLearning;
