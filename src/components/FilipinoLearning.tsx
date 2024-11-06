import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './../navigation/navigation';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const FilipinoLearning: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [showFlashcards, setShowFlashcards] = useState(false);

  const toggleFlashcards = () => {
    setShowFlashcards(!showFlashcards);
  };

  const handleNavigateToDailyLesson = () => {
    navigation.navigate('FilipinoDailyLesson');
  };

  const handleNavigateToQuizzesScreen = () => {
    navigation.navigate('FilipinoLessonQuiz');
  };

  const handleNavigateToLessonsScreen = () => {
    navigation.navigate('FilipinoLessons');
  };

  const handleNavigateToFilipinoNumbersBasicCards =() => {
    navigation.navigate('FilipinoFlashNumbersBasic')
  }



  const handleNavigateToAccoladesScreen = () => {
    navigation.navigate('FilipinoAccolades');
  };

  const handleNavigateToBodyParts = () => {
    navigation.navigate('FilipinoBodyParts');
  };



  const handleNavigateToNewTopic = () => {
    navigation.navigate('FilipinoNewTopic');
  };

  const handleNavigateToFoodAndDrink = () => {
    navigation.navigate('FilipinoFoodAndDrink');
  };

  const handleNavigateToColours = () => {
    navigation.navigate('FilipinoColours');
  };

  const handleNavigateToGreetings = () => {
    navigation.navigate('FilipinoGreetings');
  };

  const handleNavigateToGeneralTopics = () => {
    navigation.navigate('FilipinoGeneralTopics');
  };

  const handleNavigateToFamily = () => {
    navigation.navigate('FilipinoFamily');
  };

  const handleNavigateToTransport = () => {
    navigation.navigate('FilipinoTransports');
  };

  const handleNavigateToHouseItems = () => {
    navigation.navigate('FilipinoHouseItems');
  };

  const handleNavigateToWeather = () => {
    navigation.navigate('FilipinoWeather');
  };

  const handleNavigateToAnimals = () => {
    navigation.navigate('FilipinoAnimals');
  };

  return (
    <ImageBackground
      source={require('../../assets/images/PhilipinesBackground.jpg')}
      resizeMode="cover"
      style={styles.imageBackground}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          <Text style={styles.titleText}>Filipino Learning</Text>

          <View style={styles.gridContainer}>
            <TouchableOpacity 
              style={[styles.gridItem, styles.box]} 
              onPress={toggleFlashcards}
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

          {showFlashcards && (
            <View style={styles.flashcardsContainer}>
              <TouchableOpacity 
                style={[styles.row, styles.box]} 
                onPress={handleNavigateToDailyLesson}
              >
                <Text style={styles.categoriesText}>Daily lessons</Text>
                <Image 
                  source={require('../../assets/images/DailyLesson.jpg')}
                  style={styles.image}
                />
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.row, styles.box]} 
                onPress={handleNavigateToNewTopic}
              >
                <Text style={styles.categoriesText}>Learn new topic</Text>
                <Image 
                  source={require('../../assets/images/newTopic.png')}
                  style={styles.image}
                />
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.row, styles.box]} 
                onPress={handleNavigateToGreetings}
              >
                <Text style={styles.categoriesText}>Greetings</Text>
                <Image 
                  source={require('../../assets/images/GreetingImg.jpg')}
                  style={styles.image}
                />
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.row, styles.box]} 
                onPress={handleNavigateToBodyParts}
              >
                <Text style={styles.categoriesText}>Body Parts</Text>
                <Image 
                  source={require('../../assets/images/bodyPartsImg.jpg')}
                  style={styles.image}
                />
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.row, styles.box]} 
                onPress={handleNavigateToColours}
              >
                <Text style={styles.categoriesText}>Colours</Text>
                <Image 
                  source={require('../../assets/images/Colours.jpg')}
                  style={styles.image}
                />
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.row, styles.box]} 
                onPress={handleNavigateToFilipinoNumbersBasicCards}
              >
                <Text style={styles.categoriesText}>Basic Number cards</Text>
                <Image 
                  source={require('../../assets/images/number1.jpg')}
                  style={styles.image}
                />
              </TouchableOpacity>


              <TouchableOpacity 
                style={[styles.row, styles.box]} 
                onPress={handleNavigateToFoodAndDrink}
              >
                <Text style={styles.categoriesText}>Food + drink</Text>
                <Image 
                  source={require('../../assets/images/FoodAndDrink.jpg')}
                  style={styles.image}
                />
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.row, styles.box]} 
                onPress={handleNavigateToWeather}
              >
                <Text style={styles.categoriesText}>Weather</Text>
                <Image 
                  source={require('../../assets/images/Weather.jpg')}
                  style={styles.image}
                />
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.row, styles.box]} 
                onPress={handleNavigateToTransport}
              >
                <Text style={styles.categoriesText}>Transports</Text>
                <Image 
                  source={require('../../assets/images/transports.jpg')}
                  style={styles.image}
                />
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.row, styles.box]} 
                onPress={handleNavigateToFamily}
              >
                <Text style={styles.categoriesText}>Family</Text>
                <Image 
                  source={require('../../assets/images/family.jpg')}
                  style={styles.image}
                />
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.row, styles.box]} 
                onPress={handleNavigateToGeneralTopics}
              >
                <Text style={styles.categoriesText}>General topics</Text>
                <Image 
                  source={require('../../assets/images/GeneralTopics.jpg')}
                  style={styles.image}
                />
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.row, styles.box]} 
                onPress={handleNavigateToHouseItems}
              >
                <Text style={styles.categoriesText}>House Items</Text>
                <Image 
                  source={require('../../assets/images/houseItems.jpg')}
                  style={styles.image}
                />
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.row, styles.box]} 
                onPress={handleNavigateToAnimals}
              >
                <Text style={styles.categoriesText}>Animals</Text>
                <Image 
                  source={require('../../assets/images/Animals.jpg')}
                  style={styles.image}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </ImageBackground>
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
  image: {
    width: 70,
    height: 70,
    marginLeft: 10,
    resizeMode: 'contain',  // This will ensure images fit within their container
  },
  imageBackground: {
    flex: 1,             // Makes sure it takes the full height and width of the screen
    width: '100%',        // Ensures the background fills the width of the screen
    height: '100%',       // Ensures the background fills the height of the screen
    justifyContent: 'center',  // Centers content vertically
    alignItems: 'center',      // Centers content horizontally
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
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default FilipinoLearning;
