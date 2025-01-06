import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Lesson10: React.FC = () => {
  const [currentActivity, setCurrentActivity] = useState(0);
  const [userStory, setUserStory] = useState('');
  const [futurePlans, setFuturePlans] = useState('');
  const [scrambledSentence, setScrambledSentence] = useState(['blue', 'am', 'shirt', 'wearing', 'I']);
  const [userUnscrambled, setUserUnscrambled] = useState('');

  const activities = [
    {
      title: "Activity 1: Create a Story",
      description: "Write a short story using words you've learned. Describe what the character is wearing and their hobbies.",
      example: "The boy wore a red shirt and played soccer in the park.",
    },
    {
      title: "Activity 2: Daily Routine",
      description: "Describe a daily routine. Use sentences like 'I wake up at 7 AM. I wear my green dress. I like reading.'",
    },
    {
      title: "Activity 3: Sentence Race",
      description: "Unscramble the words to form a correct sentence. For example: 'blue / am / shirt / wearing / I'.",
      scrambled: scrambledSentence.join(' / '),
      answer: "I am wearing a blue shirt.",
    },
    {
      title: "Activity 4: Future Plans",
      description: "Write a sentence about your future plans using 'I will'. For example: 'I will wear my red dress tomorrow.'",
    },
  ];

  const handleNextActivity = () => {
    if (currentActivity < activities.length - 1) {
      // Clear text inputs when moving to the next activity
      setUserStory('');
      setFuturePlans('');
      setUserUnscrambled('');
      setCurrentActivity((prev) => prev + 1);
    } else {
      alert("You've completed the Final Basic Lesson! Great job!");
    }
  };

  const handleUnscrambleCheck = () => {
    if (userUnscrambled.trim() === activities[2].answer) {
      alert("Correct! Great job!");
    } else {
      alert("Try again!");
    }
  };

  return (
    <LinearGradient colors={['#FFDEE9', '#B5FFFC']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>{activities[currentActivity].title}</Text>
        <Text style={styles.description}>{activities[currentActivity].description}</Text>

        {currentActivity === 0 && (
          <>
            <TextInput
              style={styles.input}
              placeholder="Write your story here..."
              multiline
              value={userStory}
              onChangeText={setUserStory}
            />
            <Text style={styles.example}>Example: {activities[currentActivity].example}</Text>
          </>
        )}

        {currentActivity === 1 && (
          <TextInput
            style={styles.input}
            placeholder="Describe your daily routine..."
            multiline
            value={userStory}
            onChangeText={setUserStory}
          />
        )}

        {currentActivity === 2 && (
          <>
            <Text style={styles.scrambled}>{activities[currentActivity].scrambled}</Text>
            <TextInput
              style={styles.input}
              placeholder="Unscramble the sentence..."
              value={userUnscrambled}
              onChangeText={setUserUnscrambled}
            />
            <TouchableOpacity onPress={handleUnscrambleCheck} style={styles.checkButton}>
              <Text style={styles.buttonText}>Check Answer</Text>
            </TouchableOpacity>
          </>
        )}

        {currentActivity === 3 && (
          <TextInput
            style={styles.input}
            placeholder="Write your future plans here..."
            multiline
            value={futurePlans}
            onChangeText={setFuturePlans}
          />
        )}

        <TouchableOpacity onPress={handleNextActivity} style={styles.nextButton}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  description: {
    fontSize: 18,
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 100,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  scrambled: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  checkButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  nextButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  example: {
    fontSize: 16,
    color: '#888',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default Lesson10;
