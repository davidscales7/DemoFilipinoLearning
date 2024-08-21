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

  const handleNavigateToTopic = (topic: keyof RootStackParamList) => {
    navigation.navigate(topic);
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
                onPress={() => handleNavigateToTopic('FilipinoDailyLesson')}
              >
                <Text style={styles.categoriesText}>Daily lessons</Text>
                <Image 
                  source={require('../../assets/images/DailyLesson.jpg')}
                  style={styles.image}
                />
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.row, styles.box]} 
                onPress={() => handleNavigateToTopic('FilipinoNewTopic')}
              >
                <Text style={styles.categoriesText}>Learn new topic</Text>
                <Image 
                  source={require('../../assets/images/newTopic.png')}
                  style={styles.image}
                />
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.row, styles.box]} 
                onPress={() => handleNavigateToTopic('FilipinoGreetings')}
              >
                <Text style={styles.categoriesText}>Greetings</Text>
                <Image 
                  source={require('../../assets/images/GreetingImg.jpg')}
                  style={styles.image}
                />
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.row, styles.box]} 
                onPress={() => handleNavigateToTopic('FilipinoBodyparts')}
              >
                <Text style={styles.categoriesText}>Body Parts</Text>
                <Image 
                  source={require('../../assets/images/bodyPartsImg.jpg')}
                  style={styles.image}
                />
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.row, styles.box]} 
                onPress={() => handleNavigateToTopic('FilipinoColours')}
              >
                <Text style={styles.categoriesText}>Colours</Text>
                <Image 
                  source={require('../../assets/images/Colours.jpg')}
                  style={styles.image}
                />
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.row, styles.box]} 
                onPress={() => handleNavigateToTopic('FilipinoFoodAndDrink')}
              >
                <Text style={styles.categoriesText}>Food + drink</Text>
                <Image 
                  source={require('../../assets/images/FoodAndDrink.jpg')}
                  style={styles.image}
                />
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.row, styles.box]} 
                onPress={() => handleNavigateToTopic('FilipinoWeather')}
              >
                <Text style={styles.categoriesText}>Weather</Text>
                <Image 
                  source={require('../../assets/images/Weather.jpg')}
                  style={styles.image}
                />
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.row, styles.box]} 
                onPress={() => handleNavigateToTopic('FilipinoTransports')}
              >
                <Text style={styles.categoriesText}>Transports</Text>
                <Image 
                  source={require('../../assets/images/family.jpg')}
                  style={styles.image}
                />
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.row, styles.box]} 
                onPress={() => handleNavigateToTopic('FilipinoFamily')}
              >
                <Text style={styles.categoriesText}>Family</Text>
                <Image 
                  source={require('../../assets/images/family.jpg')}
                  style={styles.image}
                />
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.row, styles.box]} 
                onPress={() => handleNavigateToTopic('FilipinoGeneralTopics')}
              >
                <Text style={styles.categoriesText}>General topics</Text>
                <Image 
                  source={require('../../assets/images/GeneralTopics.jpg')}
                  style={styles.image}
                />
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.row, styles.box]} 
                onPress={() => handleNavigateToTopic('FilipinoHouseItems')}
              >
                <Text style={styles.categoriesText}>House Items</Text>
                <Image 
                  source={require('../../assets/images/transports.jpg')}
                  style={styles.image}
                />
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.row, styles.box]} 
                onPress={() => handleNavigateToTopic('FilipinoAnimals')}
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
    color: '#fff',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  gridItem: {
    width: '45%',
    margin: '2.5%',
    alignItems: 'center',
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
  imageBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
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
});

export default FilipinoLearning;
