import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './../navigation/navigation';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const FilipinoLearning: React.FC = () => {

  const navigation = useNavigation<HomeScreenNavigationProp>();

  const handleNavigateToFilipinoGreetingScreen = () => {
    navigation.navigate('FilipinoGreetings');
  };

  const handleNavigateToFilipinoBodyPartsScreen = () => {
    navigation.navigate('FilipinoBodyparts');
  };

const handleNavigateToFilipinoNewTopicScreen = () => {
  navigation.navigate('FilipinoNewTopic');
};


const handleNavigateToFilipinoDailyLessonScreen = () => {
  navigation.navigate('FilipinoDailyLesson');
};

const handleNavigateToFilipinoColoursScreen = () => {
  navigation.navigate('FilipinoColours');
};


const handleNavigateToFilipinoFoodAndDrinkScreen = () => {
  navigation.navigate('FilipinoFoodAndDrink');
};

const handleNavigateToFilipinoWeatherScreen = () => {
  navigation.navigate('FilipinoWeather');
};

const handleNavigateToFilipinoSportsScreen = () => {
  navigation.navigate('FilipinoSports');
};


const handleNavigateToFilipinoTranpsortsScreen = () => {
  navigation.navigate('FilipinoTransports');
};


const handleNavigateToFilipinoFamilyScreen = () => {
  navigation.navigate('FilipinoFamily');
};

const handleNavigateToFilipinoGeneralTopicsScreen = () => {
  navigation.navigate('FilipinoGeneralTopics');
};

const handleNavigateToFilipinoHouseItemsScreen = () => {
  navigation.navigate('FilipinoHouseItems');
};



const handleNavigateToFilipinoAniamlsScreen = () => {
  navigation.navigate('FilipinoAnimals');


};
  return (
    <ImageBackground
      source={require('../../assets/images/PhilipinesBackground.jpg')}
      resizeMode="cover"
      style={styles.imageBackground}
    >
      <View style={styles.container}>
        <Text style={styles.titleText}>Filipino Learning</Text>
        
       

        <TouchableOpacity 
        style={[styles.row, styles.box]} 
        onPress={handleNavigateToFilipinoDailyLessonScreen}
        >
        <Text style={styles.categoriesText}>Daily lessons</Text>
        <Image 
            source={require('../../assets/images/DailyLesson.jpg')}
            style={styles.image}
          />
        </TouchableOpacity>

     
        <TouchableOpacity 
        style={[styles.row, styles.box]} 
        onPress={handleNavigateToFilipinoNewTopicScreen}
        >
        <Text style={styles.categoriesText}>Learn new topic</Text>
        <Image 
            source={require('../../assets/images/newTopic.png')}
            style={styles.image}
          />
        </TouchableOpacity>



        <TouchableOpacity 
          style={[styles.row, styles.box]} 
          onPress={handleNavigateToFilipinoGreetingScreen}
        >
          <Text style={styles.categoriesText}>Greetings</Text>
          <Image 
            source={require('../../assets/images/GreetingImg.jpg')}
            style={styles.image}
          />
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.row, styles.box]} 
          onPress={handleNavigateToFilipinoBodyPartsScreen}
        >
          <Text style={styles.categoriesText}>Body Parts</Text>
          <Image 
            source={require('../../assets/images/bodyPartsImg.jpg')}
            style={styles.image}
          />
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.row, styles.box]} 
          onPress={handleNavigateToFilipinoColoursScreen}
        >
          <Text style={styles.categoriesText}>Colours</Text>
          <Image 
            source={require('../../assets/images/Colours.jpg')}
            style={styles.image}
          />
        </TouchableOpacity>



        <TouchableOpacity 
          style={[styles.row, styles.box]} 
          onPress={handleNavigateToFilipinoFoodAndDrinkScreen}
        >
          <Text style={styles.categoriesText}>Food + drink</Text>
          <Image 
            source={require('../../assets/images/FoodAndDrink.jpg')}
            style={styles.image}
          />
        </TouchableOpacity>


        <TouchableOpacity 
          style={[styles.row, styles.box]} 
          onPress={handleNavigateToFilipinoWeatherScreen}
        >
          <Text style={styles.categoriesText}>Weather</Text>
          <Image 
            source={require('../../assets/images/Weather.jpg')}
            style={styles.image}
          />
        </TouchableOpacity>



        <TouchableOpacity 
          style={[styles.row, styles.box]} 
          onPress={handleNavigateToFilipinoSportsScreen}
        >
          <Text style={styles.categoriesText}>Sports</Text>
          <Image 
            source={require('../../assets/images/sports.jpg')}
            style={styles.image}
          />
        </TouchableOpacity>



        <TouchableOpacity 
          style={[styles.row, styles.box]} 
          onPress={handleNavigateToFilipinoTranpsortsScreen}
        >
          <Text style={styles.categoriesText}>Transports</Text>
          <Image 
            source={require('../../assets/images/family.jpg')}
            style={styles.image}
          />
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.row, styles.box]} 
          onPress={handleNavigateToFilipinoFamilyScreen}
        >
          <Text style={styles.categoriesText}>Family</Text>
          <Image 
            source={require('../../assets/images/family.jpg')}
            style={styles.image}
          />
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.row, styles.box]} 
          onPress={handleNavigateToFilipinoGeneralTopicsScreen}
        >
          <Text style={styles.categoriesText}>General topics</Text>
          <Image 
            source={require('../../assets/images/GeneralTopics.jpg')}
            style={styles.image}
          />
        </TouchableOpacity>


        <TouchableOpacity 
          style={[styles.row, styles.box]} 
          onPress={handleNavigateToFilipinoHouseItemsScreen}
        >
          <Text style={styles.categoriesText}>House Items</Text>
          <Image 
            source={require('../../assets/images/transports.jpg')}
            style={styles.image}
          />
        </TouchableOpacity>

<TouchableOpacity 
          style={[styles.row, styles.box]} 
          onPress={handleNavigateToFilipinoAniamlsScreen}
        >
          <Text style={styles.categoriesText}>Animals</Text>
          <Image 
            source={require('../../assets/images/Animals.jpg')}
          />
    </TouchableOpacity>


        <Text style={styles.categoriesText}>Animals</Text>

      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
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
  imageBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 10,
  },
});

export default FilipinoLearning;
