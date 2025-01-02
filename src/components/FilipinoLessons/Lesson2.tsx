import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions, useWindowDimensions, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/navigation';
// animals 
type Card = {
  id: number;
  content: string;
  isFlipped: boolean;
  isMatched: boolean;
  opacity: Animated.Value;
};

type Lesson2NavigationProp = StackNavigationProp<RootStackParamList, 'FilipinoLessons'>;

const cardData: Card[] = [
  { id: 1, content: 'Pusa', isFlipped: false, isMatched: false, opacity: new Animated.Value(1) }, // Cat
  { id: 2, content: '🐱', isFlipped: false, isMatched: false, opacity: new Animated.Value(1) },
  { id: 3, content: 'Aso', isFlipped: false, isMatched: false, opacity: new Animated.Value(1) }, // Dog
  { id: 4, content: '🐶', isFlipped: false, isMatched: false, opacity: new Animated.Value(1) },
  { id: 5, content: 'Ibon', isFlipped: false, isMatched: false, opacity: new Animated.Value(1) }, // Bird
  { id: 6, content: '🐦', isFlipped: false, isMatched: false, opacity: new Animated.Value(1) },
  { id: 7, content: 'Unggoy', isFlipped: false, isMatched: false, opacity: new Animated.Value(1) }, // Monkey
  { id: 8, content: '🐵', isFlipped: false, isMatched: false, opacity: new Animated.Value(1) },
  { id: 9, content: 'Tigre', isFlipped: false, isMatched: false, opacity: new Animated.Value(1) }, // Tiger
  { id: 10, content: '🐯', isFlipped: false, isMatched: false, opacity: new Animated.Value(1) },
  { id: 11, content: 'Isda', isFlipped: false, isMatched: false, opacity: new Animated.Value(1) }, // Fish
  { id: 12, content: '🐟', isFlipped: false, isMatched: false, opacity: new Animated.Value(1) },
  { id: 13, content: 'Leon', isFlipped: false, isMatched: false, opacity: new Animated.Value(1) }, // Lion
  { id: 14, content: '🦁', isFlipped: false, isMatched: false, opacity: new Animated.Value(1) },
  { id: 15, content: 'Ahas', isFlipped: false, isMatched: false, opacity: new Animated.Value(1) }, // Snake
  { id: 16, content: '🐍', isFlipped: false, isMatched: false, opacity: new Animated.Value(1) },
  { id: 17, content: 'Manok', isFlipped: false, isMatched: false, opacity: new Animated.Value(1) }, // Chicken
  { id: 18, content: '🐔', isFlipped: false, isMatched: false, opacity: new Animated.Value(1) },
  { id: 19, content: 'Baka', isFlipped: false, isMatched: false, opacity: new Animated.Value(1) }, // Cow
  { id: 20, content: '🐄', isFlipped: false, isMatched: false, opacity: new Animated.Value(1) },
  { id: 21, content: 'Kambing', isFlipped: false, isMatched: false, opacity: new Animated.Value(1) }, // Goat
  { id: 22, content: '🐐', isFlipped: false, isMatched: false, opacity: new Animated.Value(1) },
  { id: 23, content: 'Baboy', isFlipped: false, isMatched: false, opacity: new Animated.Value(1) }, // Pig
  { id: 24, content: '🐖', isFlipped: false, isMatched: false, opacity: new Animated.Value(1) },
];

const Lesson2: React.FC = () => {
  const navigation = useNavigation<Lesson2NavigationProp>();

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
      const delay = 1000; // 1 second delay

      // Check if cards match
      const isMatch =
        (newCards[firstIndex].content === 'Pusa' && newCards[secondIndex].content === '🐱') ||
        (newCards[firstIndex].content === '🐱' && newCards[secondIndex].content === 'Pusa') ||
        (newCards[firstIndex].content === 'Aso' && newCards[secondIndex].content === '🐶') ||
        (newCards[firstIndex].content === '🐶' && newCards[secondIndex].content === 'Aso') ||
        (newCards[firstIndex].content === 'Ibon' && newCards[secondIndex].content === '🐦') ||
        (newCards[firstIndex].content === '🐦' && newCards[secondIndex].content === 'Ibon') ||
        (newCards[firstIndex].content === 'Unggoy' && newCards[secondIndex].content === '🐵') ||
        (newCards[firstIndex].content === '🐵' && newCards[secondIndex].content === 'Unggoy') ||
        (newCards[firstIndex].content === 'Tigre' && newCards[secondIndex].content === '🐯') ||
        (newCards[firstIndex].content === '🐯' && newCards[secondIndex].content === 'Tigre') ||
        (newCards[firstIndex].content === 'Isda' && newCards[secondIndex].content === '🐟') ||
        (newCards[firstIndex].content === '🐟' && newCards[secondIndex].content === 'Isda') ||
        (newCards[firstIndex].content === 'Leon' && newCards[secondIndex].content === '🦁') ||
        (newCards[firstIndex].content === '🦁' && newCards[secondIndex].content === 'Leon') ||
        (newCards[firstIndex].content === 'Ahas' && newCards[secondIndex].content === '🐍') ||
        (newCards[firstIndex].content === '🐍' && newCards[secondIndex].content === 'Ahas') ||
        (newCards[firstIndex].content === 'Manok' && newCards[secondIndex].content === '🐔') ||
        (newCards[firstIndex].content === '🐔' && newCards[secondIndex].content === 'Manok') ||
        (newCards[firstIndex].content === 'Baka' && newCards[secondIndex].content === '🐄') ||
        (newCards[firstIndex].content === '🐄' && newCards[secondIndex].content === 'Baka') ||
        (newCards[firstIndex].content === 'Kambing' && newCards[secondIndex].content === '🐐') ||
        (newCards[firstIndex].content === '🐐' && newCards[secondIndex].content === 'Kambing') ||
        (newCards[firstIndex].content === 'Baboy' && newCards[secondIndex].content === '🐖') ||
        (newCards[firstIndex].content === '🐖' && newCards[secondIndex].content === 'Baboy');

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

export default Lesson2;
