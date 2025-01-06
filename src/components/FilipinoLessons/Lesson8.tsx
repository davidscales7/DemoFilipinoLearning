import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
//Hobbies and interests
const slides = [
  { word: "Reading", translated: "Pagbabasa", image: require('../../../assets/images/reading.jpg') },
  { word: "Playing Sports", translated: "Paglalaro ng Palakasan", image: require('../../../assets/images/sports.jpg') },
  { word: "Watching Movies", translated: "Panonood ng Pelikula", image: require('../../../assets/images/movies.jpg') },
  { word: "Cooking", translated: "Pagluluto", image: require('../../../assets/images/cooking.jpg') },
  { word: "Dancing", translated: "Pagsasayaw", image: require('../../../assets/images/dancing.jpg') },
  { word: "Singing", translated: "Pagkanta", image: require('../../../assets/images/singing.jpg') },
  { word: "Drawing", translated: "Pagpipinta", image: require('../../../assets/images/drawing.jpg') },
  { word: "Gardening", translated: "Paghahalaman", image: require('../../../assets/images/gardening.jpg') },
  { word: "Traveling", translated: "Paglalakbay", image: require('../../../assets/images/traveling.jpg') },
  { word: "Playing Instruments", translated: "Pagtugtog ng Instrumento", image: require('../../../assets/images/music.jpg') },
];

const questions = [
  {
    question: "How do you say 'Reading' in Tagalog?",
    options: ["Pagluluto", "Pagbabasa", "Pagsasayaw", "Pagpipinta"],
    correctAnswer: "Pagbabasa",
    image: require('../../../assets/images/reading.jpg'),
  },
  {
    question: "How do you say 'Cooking' in Tagalog?",
    options: ["Pagsasayaw", "Pagluluto", "Panonood ng Pelikula", "Paghahalaman"],
    correctAnswer: "Pagluluto",
    image: require('../../../assets/images/cooking.jpg'),
  },
  {
    question: "How do you say 'Watching Movies' in Tagalog?",
    options: ["Paglalakbay", "Panonood ng Pelikula", "Pagtugtog ng Instrumento", "Pagkanta"],
    correctAnswer: "Panonood ng Pelikula",
    image: require('../../../assets/images/movies.jpg'),
  },
  {
    question: "What hobby is 'Pagpipinta' in English?",
    options: ["Drawing", "Dancing", "Traveling", "Gardening"],
    correctAnswer: "Drawing",
    image: require('../../../assets/images/drawing.jpg'),
  },
  {
    question: "What is the Tagalog translation of 'Playing Instruments'?",
    options: ["Pagtugtog ng Instrumento", "Pagbabasa", "Pagpipinta", "Pagkanta"],
    correctAnswer: "Pagtugtog ng Instrumento",
    image: require('../../../assets/images/music.jpg'),
  },
];



const dialogues = [
  {
    // Question: "What is your hobby?" - This asks the listener about their hobby.
    question: "Ano ang iyong libangan?",

    // Answer: "I like reading." - This responds with a specific hobby (reading).
    answer: "Gusto kong magbasa." 
  },
  {
    // Question: "Do you like to cook?" - This asks if the listener enjoys cooking.
    question: "Gusto mo bang magluto?",

    // Answer: "Yes, I like to cook delicious food." - This affirms and elaborates with details.
    answer: "Oo, gusto kong magluto ng mga masarap na pagkain."
  },
  {
    // Question: "What do you do every Saturday?" - This asks about a habitual activity on Saturdays.
    question: "Ano ang ginagawa mo tuwing Sabado?",

    // Answer: "I paint every Saturday." - This responds with a specific hobby (painting) and mentions the routine.
    answer: "Nagpipinta ako tuwing Sabado."
  },
  {
    // Question: "Do you enjoy singing?" - This asks if the listener enjoys the hobby of singing.
    question: "Gusto mo bang kumanta?",

    // Answer: "Yes, I love singing songs." - This affirms the interest in singing with an added detail.
    answer: "Oo, mahilig akong kumanta ng mga kanta."
  },
  {
    // Question: "What hobby do you want to learn?" - This asks about a hobby the listener is interested in learning.
    question: "Anong libangan ang gusto mong matutunan?",

    // Answer: "I want to learn how to play the guitar." - This responds with a specific interest (playing the guitar).
    answer: "Gusto kong matutong tumugtog ng gitara."
  },
];



const Lesson8: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [inDialoguePhase, setInDialoguePhase] = useState(false);
  const [currentDialogue, setCurrentDialogue] = useState(0);

  const handleNextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    } else {
      setCurrentSlide(null); // Indicates that the intro slides are over
    }
  };

  const handleOptionPress = (option: string) => {
    if (selectedOption === option) {
      setShowAnswer(true);
      setTimeout(() => {
        setCurrentQuestion((prev) => prev + 1);
        setSelectedOption(null);
        setShowAnswer(false);
      }, 3000); // 3 seconds delay before moving to the next question
    } else {
      setSelectedOption(option);
    }
  };

  if (currentSlide !== null && currentSlide < slides.length) {
    return (
      <LinearGradient colors={['#FFDEE9', '#B5FFFC']} style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.text}>{slides[currentSlide].word}</Text>
          <Image source={slides[currentSlide].image} style={styles.introImage} resizeMode="contain" />
          <Text style={styles.text}>{slides[currentSlide].translated}</Text>
        </View>
        <TouchableOpacity onPress={handleNextSlide} style={styles.nextButton}>
          <Text style={styles.optionText}>Next</Text>
        </TouchableOpacity>
      </LinearGradient>
    );
  }

  if (currentQuestion >= questions.length && !inDialoguePhase) {
    setInDialoguePhase(true); // Start dialogue phase
    setCurrentDialogue(0); // Reset dialogue index
  }

  if (inDialoguePhase) {
    const dialogue = dialogues[currentDialogue];

    return (
      <LinearGradient colors={['#FFDEE9', '#B5FFFC']} style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.text}>Q: {dialogue.question}</Text>
          <Text style={styles.answerText}>A: {dialogue.answer}</Text>
          <TouchableOpacity
            onPress={() => {
              if (currentDialogue < dialogues.length - 1) {
                setCurrentDialogue((prev) => prev + 1);
              } else {
                setInDialoguePhase(false);
                alert("You've completed the lesson! 🎉");
              }
            }}
            style={styles.nextButton}
          >
            <Text style={styles.optionText}>Next</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }

  if (currentQuestion >= questions.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>You've completed the First lesson</Text>
      </View>
    );
  }

  return (
    <LinearGradient colors={['#FFDEE9', '#B5FFFC']} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Question {currentQuestion + 1} of {questions.length}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.text}>{questions[currentQuestion].question}</Text>
        {!showAnswer ? (
          questions[currentQuestion].options.map((option) => (
            <TouchableOpacity
              key={option}
              onPress={() => handleOptionPress(option)}
              style={[
                styles.optionButton,
                selectedOption === option && styles.selectedOption,
              ]}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <>
            <Text style={styles.answerText}>
              Correct Answer: {questions[currentQuestion].correctAnswer}
            </Text>
            <Image
              source={questions[currentQuestion].image}
              style={styles.answerImage}
              resizeMode="contain"
            />
          </>
        )}
      </View>
    </LinearGradient>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  header: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
    alignItems: 'center', // Center the content
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  optionButton: {
    padding: 15,
    marginVertical: 10,
    borderRadius: 5,
    backgroundColor: '#ddd',
    width: '100%', // Ensure the button width is full
    alignItems: 'center',
  },
  optionText: {
    fontSize: 18,
    color: '#333',
  },
  selectedOption: {
    backgroundColor: 'orange',
  },
  answerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'green',
    textAlign: 'center',
    marginBottom: 20,
  },
  answerImage: {
    width: '80%',
    height: 200,
  },
  introImage: {
    width: '80%',
    height: 300,
    marginBottom: 20,
  },
  nextButton: {
    padding: 15,
    marginTop: 20,
    borderRadius: 5,
    backgroundColor: 'blue',
    alignItems: 'center',
  },
});

export default Lesson8;
