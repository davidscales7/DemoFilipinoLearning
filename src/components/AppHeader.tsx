// AppHeader.tsx
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ImageBackground} from 'react-native';
import { RootStackParamList } from '../navigation/navigation';
type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const AppHeader = () => {
  const [isClicked, setIsClicked] = useState(false);
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const handleNavigateToUkrainianScreen = () => {
    navigation.navigate('Ukrainian');
  };

  const handleNavigateToFilipinoScreen = () => {
    navigation.navigate('Filipino');
  };

  return (

  //   <ImageBackground 
  //   source={require('../../assets/images/PhilipinesBackground.jpg')} // Update this path to your actual image path
  //   style={styles.backgroundImage}
  // >

    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome</Text>
      {!isClicked ? (
        <TouchableOpacity onPress={() => setIsClicked(true)}>
          <Image
            source={require('../../assets/images/HomeGlobe.gif')}
            style={styles.clickableGif}
          />
        </TouchableOpacity>
      ) : (
        <View style={styles.header}>
         
          <TouchableOpacity onPress={handleNavigateToFilipinoScreen}>
            <Image
              source={require('../../assets/images/FlagPhil.gif')}
              style={styles.reactLogo}
            />
          </TouchableOpacity>

 {/* <TouchableOpacity onPress={handleNavigateToUkrainianScreen}>
            <Image
              source={require('../../assets/images/FlagUkraine.gif')}
              style={styles.reactLogo}
            />
          </TouchableOpacity>
  */}
 
  </View>
     
     )}
    </View>
    // </ImageBackground>
  );
};
const styles = StyleSheet.create({
  container: {
    
      flex: 1,               // Ensures the container takes full available space
      justifyContent: 'center',  // Centers content vertically
      alignItems: 'center',      // Centers content horizontally
     
  },
  clickableGif: {
    width: 100,
    height: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 50,
  },
  welcomeText: {
    fontSize: 24,
    marginVertical: 20,
    textAlign: 'center',
  },
  reactLogo: {
    width: 100,
    height: 50,
    marginHorizontal: 20,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
export default AppHeader;
