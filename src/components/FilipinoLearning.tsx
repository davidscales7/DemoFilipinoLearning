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

  return (
    <ImageBackground 
      source={require('../../assets/images/PhilipinesBackground.jpg')}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.titleText}>Filipino Learning</Text>
        
        <Text style={styles.catogoriesText}>Daily lessons</Text>
        <Text style={styles.catogoriesText}>Learn new topic</Text>
        
        <TouchableOpacity 
          style={styles.row} 
          onPress={handleNavigateToFilipinoGreetingScreen}
        >
          <Text style={styles.catogoriesText}>Greetings</Text>
          <Image 
            source={require('../../assets/images/GreetingImg.jpg')}
            style={styles.image}
          />
        </TouchableOpacity>

        <Text style={styles.catogoriesText}>Body parts</Text>
        <Text style={styles.catogoriesText}>Colours</Text>
        <Text style={styles.catogoriesText}>Food + drink</Text>
        <Text style={styles.catogoriesText}>Weather</Text>
        <Text style={styles.catogoriesText}>Sports</Text>
        <Text style={styles.catogoriesText}>Transports</Text>
        <Text style={styles.catogoriesText}>Family</Text>
        <Text style={styles.catogoriesText}>General topics</Text>
        <Text style={styles.catogoriesText}>House items</Text>
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
  },
  catogoriesText: {
    fontSize: 20,
    marginVertical: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  image: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
  imageBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FilipinoLearning;
