// AppHeader.tsx
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { RootStackParamList } from '../navigation/navigation';

type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;

const AppHeader = () => {
  const [isClicked, setIsClicked] = useState(false);
  const navigation = useNavigation<HomeScreenNavigationProp>();

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
          {/* Filipino Flag */}
          <TouchableOpacity onPress={handleNavigateToFilipinoScreen}>
            <Image
              source={require('../../assets/images/FlagPhil.gif')}
              style={styles.flagImage}
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
    justifyContent: 'center',
    alignItems: 'center',
  },

  welcomeText: {
    fontSize: 24,
    marginVertical: 20,
    textAlign: 'center',
  },

  clickableGif: {
    width: 120,
    height: 120,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 40,
  },

  flagImage: {
    width: 120,
    height: 70,
    resizeMode: 'contain',
  },
});

export default AppHeader;
