import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions, useWindowDimensions, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
// This needs to be Lesson 5 for teaching animals
type Card = {
  id: number;
  content: string;
  isFlipped: boolean;
  isMatched: boolean;
  opacity: Animated.Value;
};

type Lesson6NavigationProp = StackNavigationProp<RootStackParamList, 'FilipinoLessons'>;

const cardData: Card[] = [
  { id: 1, content: 'Tubig', isFlipped: false, isMatched: false, opacity: new Animated.Value(1) }, // Water
  { id: 2, content: '💧', isFlipped: false, isMatched: false, opacity: new Animated.Value(1) },
  { id: 3, content: 'Kape', isFlipped: false, isMatched: false, opacity: new Animated.Value(1) }, // Coffee
  { id: 4, content: '☕', isFlipped: false, isMatched: false, opacity: new Animated.Value(1) },
  { id: 5, content: 'Tinapay', isFlipped: false, isMatched: false, opacity: new Animated.Value(1) }, // Bread
  { id: 6, content: '🍞', isFlipped: false, isMatched: false, opacity: new Animated.Value(1) },
  { id: 7, content: 'Gatas', isFlipped: false, isMatched: false, opacity: new Animated.Value(1) }, // Milk
  { id: 8, content: '🥛', isFlipped: false, isMatched: false, opacity: new Animated.Value(1) },
  { id: 9, content: 'Saging', isFlipped: false, isMatched: false, opacity: new Animated.Value(1) }, // Banana
  { id: 10, content: '🍌', isFlipped: false, isMatched: false, opacity: new Animated.Value(1) },
  { id: 11, content: 'Kanin', isFlipped: false, isMatched: false, opacity: new Animated.Value(1) }, // Rice
  { id: 12, content: '🍚', isFlipped: false, isMatched: false, opacity: new Animated.Value(1) },
  { id: 13, content: 'Isda', isFlipped: false, isMatched: false, opacity: new Animated.Value(1) }, // Fish
  { id: 14, content: '🐟', isFlipped: false, isMatched: false, opacity: new Animated.Value(1) },
  { id: 15, content: 'Adobo', isFlipped: false, isMatched: false, opacity: new Animated.Value(1) }, // Adobo
  { id: 16, content: '🍗', isFlipped: false, isMatched: false, opacity: new Animated.Value(1) },
  { id: 17, content: 'Mansanas', isFlipped: false, isMatched: false, opacity: new Animated.Value(1) }, // Apple
  { id: 18, content: '🍎', isFlipped: false, isMatched: false, opacity: new Animated.Value(1) },
  { id: 19, content: 'Sopas', isFlipped: false, isMatched: false, opacity: new Animated.Value(1) }, // Soup
  { id: 20, content: '🍜', isFlipped: false, isMatched: false, opacity: new Animated.Value(1) },
  { id: 21, content: 'Tsokolate', isFlipped: false, isMatched: false, opacity: new Animated.Value(1) }, // Chocolate
  { id: 22, content: '🍫', isFlipped: false, isMatched: false, opacity: new Animated.Value(1) },
  { id: 23, content: 'Pineapple Juice', isFlipped: false, isMatched: false, opacity: new Animated.Value(1) }, // Pineapple Juice
  { id: 24, content: '🍍', isFlipped: false, isMatched: false, opacity: new Animated.Value(1) },
];


const Lesson6: React.FC = () => {
  const navigation = useNavigation<Lesson6NavigationProp>();

  const { width, height } = useWindowDimensions(); // Get the screen dimensions

  const isLandscape = width > height;

  // Adjust the number of columns and rows to fit the screen
  const numColumns = isLandscape ? 6 : 4;
  const numRows = Math.ceil(cardData.length / numColumns);

  // Calculate card size based on the number of columns
  const cardSize = width / numColumns - 10; // Adjust the margin as needed

  const [cards, setCards] = useState<Card[]>(cardData);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [isCheckingMatch, setIsCheckingMatch] = useState(false);

  const handleCardClick = (index: number) => {
    if (isCheckingMatch || cards[index].isFlipped || flippedIndices.length === 2) {
      return;
    }

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);
    setFlippedIndices([...flippedIndices, index]);

    if (flippedIndices.length === 1) {
      setIsCheckingMatch(true);

      const firstIndex = flippedIndices[0];
      const secondIndex = index;
      const delay = 500; // 1 second delay

      // Check if cards match
      const isMatch =
      (newCards[firstIndex].content === 'Tubig' && newCards[secondIndex].content === '💧') ||
      (newCards[firstIndex].content === '💧' && newCards[secondIndex].content === 'Tubig') ||
      (newCards[firstIndex].content === 'Kape' && newCards[secondIndex].content === '☕') ||
      (newCards[firstIndex].content === '☕' && newCards[secondIndex].content === 'Kape') ||
      (newCards[firstIndex].content === 'Tinapay' && newCards[secondIndex].content === '🍞') ||
      (newCards[firstIndex].content === '🍞' && newCards[secondIndex].content === 'Tinapay') ||
      (newCards[firstIndex].content === 'Gatas' && newCards[secondIndex].content === '🥛') ||
      (newCards[firstIndex].content === '🥛' && newCards[secondIndex].content === 'Gatas') ||
      (newCards[firstIndex].content === 'Saging' && newCards[secondIndex].content === '🍌') ||
      (newCards[firstIndex].content === '🍌' && newCards[secondIndex].content === 'Saging') ||
      (newCards[firstIndex].content === 'Kanin' && newCards[secondIndex].content === '🍚') ||
      (newCards[firstIndex].content === '🍚' && newCards[secondIndex].content === 'Kanin') ||
      (newCards[firstIndex].content === 'Isda' && newCards[secondIndex].content === '🐟') ||
      (newCards[firstIndex].content === '🐟' && newCards[secondIndex].content === 'Isda') ||
      (newCards[firstIndex].content === 'Adobo' && newCards[secondIndex].content === '🍗') ||
      (newCards[firstIndex].content === '🍗' && newCards[secondIndex].content === 'Adobo') ||
      (newCards[firstIndex].content === 'Mansanas' && newCards[secondIndex].content === '🍎') ||
      (newCards[firstIndex].content === '🍎' && newCards[secondIndex].content === 'Mansanas') ||
      (newCards[firstIndex].content === 'Sopas' && newCards[secondIndex].content === '🍜') ||
      (newCards[firstIndex].content === '🍜' && newCards[secondIndex].content === 'Sopas') ||
      (newCards[firstIndex].content === 'Tsokolate' && newCards[secondIndex].content === '🍫') ||
      (newCards[firstIndex].content === '🍫' && newCards[secondIndex].content === 'Tsokolate') ||
      (newCards[firstIndex].content === 'Pineapple Juice' && newCards[secondIndex].content === '🍍') ||
      (newCards[firstIndex].content === '🍍' && newCards[secondIndex].content === 'Pineapple Juice');
    
      if (isMatch) {
        setTimeout(() => {
          newCards[firstIndex].isMatched = true;
          newCards[secondIndex].isMatched = true;
          newCards[firstIndex].opacity.setValue(0);
          newCards[secondIndex].opacity.setValue(0);
          setCards(newCards);
          setFlippedIndices([]);
          setIsCheckingMatch(false);
        }, delay);
      } else {
        setTimeout(() => {
          newCards[firstIndex].isFlipped = false;
          newCards[secondIndex].isFlipped = false;
          setCards(newCards);
          setFlippedIndices([]);
          setIsCheckingMatch(false);
        }, delay);
      }
    }
  };

  const handleReset = () => {
    setCards(cardData.map(card => ({ ...card, isFlipped: false, isMatched: false, opacity: new Animated.Value(1) })));
    setFlippedIndices([]);
    setIsCheckingMatch(false);
  };

  const handleNavigateToLessonsScreen = () => {
    navigation.navigate('FilipinoLessons');
  };
  async function finishedLessonForAccoladePosting(){
    








    const token = await AsyncStorage.getItem('token')
    fetch('http://localhost:3000/addAccolade', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${token}`},
      body: JSON.stringify({accolade:"LessonTestLesson6"})
  })
  .then(response => response.json())
  .then(data => {
  
  })
  
    }
    finishedLessonForAccoladePosting()
  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={[styles.container, { padding: 5 }]}>
        <Text style={styles.title}>Filipino Animal Matching Game</Text>
        <View style={styles.grid}>
          {cards.map((card, index) => (
            <Animated.View key={card.id} style={{ opacity: card.opacity }}>
              <TouchableOpacity
                style={[
                  styles.card,
                  {
                    width: cardSize,
                    height: cardSize,
                    backgroundColor: card.isFlipped || card.isMatched ? '#fff' : '#ccc',
                    borderColor: card.isFlipped || card.isMatched ? '#000' : '#999',
                  },
                ]}
                onPress={() => handleCardClick(index)}
              >
                <Text style={styles.cardText}>
                  {card.isFlipped || card.isMatched ? card.content : '?'}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>
        <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
          <Text style={styles.buttonText}>Reset Game</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navigateButton} onPress={handleNavigateToLessonsScreen}>
          <Text style={styles.buttonText}>Back to Lessons</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderWidth: 2,
    borderRadius: 10,
  },
  cardText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  resetButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
  },
  navigateButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#2196F3',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
});

export default Lesson6;
