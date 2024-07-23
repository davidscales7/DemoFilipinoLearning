// AppHeader.tsx
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
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

          <TouchableOpacity onPress={handleNavigateToUkrainianScreen}>
            <Image
              source={require('../../assets/images/FlagUkraine.gif')}
              style={styles.reactLogo}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clickableGif: {
    width: 200,
    height: 200,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  welcomeText: {
    fontSize: 24,
    marginTop: 50,
  },
  reactLogo: {
    width: 200,
    height: 100,
    marginHorizontal: 10,
  },
});

export default AppHeader;
