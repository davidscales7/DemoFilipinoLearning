import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
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
          source={require('../../assets/images/GreetingImg.jpg')} // Update this path to your actual image path
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 20,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20, // Adds space below the title
  },
  catogoriesText: {
    fontSize: 20,
    marginVertical: 5, // Adds space above and below each category
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5, // Adds space above and below the row
  },
  image: {
    width: 20, // Set the width of the image
    height: 20, // Set the height of the image
    marginLeft: 10, // Adds space between the text and the image
  },
});

export default FilipinoLearning;
