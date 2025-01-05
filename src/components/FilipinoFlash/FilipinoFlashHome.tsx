import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './../../navigation/navigation';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const FilipinoFlashHome: React.FC = () => {
    const navigation = useNavigation<HomeScreenNavigationProp>();
    const [showFlashcards, ] = useState(true);
  
   


  const handleNavigateToFlashFilipinoGreetings= () => {
    navigation.navigate('FilipinoGreetings');

  }
  
  const handleNavigateToFlashBodyParts = () => {
    navigation.navigate('FilipinoBodyParts');

  }


const  handleNavigateToFlashFilipinoColours = () => {
    navigation.navigate('FilipinoColours');

  }
  

 const handleNavigateToFlashFilipinoFoodAndDrink = () => {
  navigation.navigate('FilipinoFoodAndDrink');

}



const handleNavigateToFlashFilipinoWeather = () => {
  navigation.navigate('FilipinoWeather');

}



const  handleNavigateToFlashTransport = () => {
  navigation.navigate('FilipinoTransports');

}



const  handleNavigateToFlashFamily = () => {
  navigation.navigate('FilipinoFamily');

}

const  handleNavigateToFlashGeneralTopics = () => {
  navigation.navigate('FilipinoGeneralTopics');

}

const   handleNavigateToFlashHouseItems = () => {
  navigation.navigate('FilipinoGreetings');

}

const  handleNavigateToFlashAnimals = () => {
  navigation.navigate('FilipinoAnimals');

}




return (

      
 
              <View style={styles.background}>
      <ScrollView style={styles.scrollViewContent}>
        <View style={styles.container}>
          <Text style={styles.titleText}>Filipino Flashcards</Text>

        
          </View>

          {showFlashcards && (
            <View style={styles.flashcardsContainer}>
             


              <TouchableOpacity 
                style={[styles.row, styles.box]} 
                onPress={ handleNavigateToFlashFilipinoGreetings}
              >
                <Text style={styles.categoriesText}>Greetings</Text>
                <Image 
                  source={require('../../../assets/images/GreetingImg.jpg')}
                  style={styles.image}
                />
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.row, styles.box]} 
                onPress={handleNavigateToFlashBodyParts}
              >
                <Text style={styles.categoriesText}>Body Parts</Text>
                <Image 
                  source={require('../../../assets/images/bodyPartsImg.jpg')}
                  style={styles.image}
                />
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.row, styles.box]} 
                onPress={handleNavigateToFlashFilipinoColours}
              >
                <Text style={styles.categoriesText}>Colours</Text>
                <Image 
                  source={require('../../../assets/images/Colours.jpg')}
                  style={styles.image}
                />
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.row, styles.box]} 
                onPress={ handleNavigateToFlashFilipinoFoodAndDrink}
              >
                <Text style={styles.categoriesText}>Food + drink</Text>
                <Image 
                  source={require('../../../assets/images/FoodAndDrink.jpg')}
                  style={styles.image}
                />
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.row, styles.box]} 
                onPress={ handleNavigateToFlashFilipinoWeather}
              >
                <Text style={styles.categoriesText}>Weather</Text>
                <Image 
                  source={require('../../../assets/images/Weather.jpg')}
                  style={styles.image}
                />
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.row, styles.box]} 
                onPress={ handleNavigateToFlashTransport}
              >
                <Text style={styles.categoriesText}>Transports</Text>
                <Image 
                  source={require('../../../assets/images/family.jpg')}
                  style={styles.image}
                />
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.row, styles.box]} 
                onPress={ handleNavigateToFlashFamily}
              >
                <Text style={styles.categoriesText}>Family</Text>
                <Image 
                  source={require('../../../assets/images/family.jpg')}
                  style={styles.image}
                />
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.row, styles.box]} 
                onPress={ handleNavigateToFlashGeneralTopics}
              >
                <Text style={styles.categoriesText}>General topics</Text>
                <Image 
                  source={require('../../../assets/images/GeneralTopics.jpg')}
                  style={styles.image}
                />
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.row, styles.box]} 
                onPress={  handleNavigateToFlashHouseItems}
              >
                <Text style={styles.categoriesText}>House Items</Text>
                <Image 
                  source={require('../../../assets/images/transports.jpg')}
                  style={styles.image}
                />
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.row, styles.box]} 
                onPress={handleNavigateToFlashAnimals}
              >
                <Text style={styles.categoriesText}>Animals</Text>
                <Image 
                  source={require('../../../assets/images/Animals.jpg')}
                  style={styles.image}
                />
              </TouchableOpacity>
            </View>
          )}
        
      </ScrollView>
      </View>
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
    // Aligns content to the right
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
  background: {
    flex: 1,
    backgroundColor: '#6489bd', // Light Grey or any other chosen color
 
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

export default FilipinoFlashHome;
