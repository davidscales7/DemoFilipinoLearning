// src/screens/FilipinoQuizzes/QuizData.ts
import { ImageSourcePropType } from "react-native";
import { Accolade } from "../../store/useAccoladeStore";
import { DEMO_ACCOLADES } from "../demo/DemoAccolades";

export type QuizQuestion = {
  question: string;
  options: string[];
  correctAnswer: string;
  image: ImageSourcePropType;
};

export type QuizData = {
  id: number;
  title: string;
  accoladeKey: Accolade;
  xpReward: number;
  questions: QuizQuestion[];
};

export const QUIZZES: QuizData[] = [
  {
    id: 1,
    title: "Greetings Quiz",
    accoladeKey: DEMO_ACCOLADES.QUIZZES.QUIZ_1, // First quiz → QUIZ_1
    xpReward: 20,
    questions: [
      {
        question: "What is the correct translation for 'Kamusta'?",
        options: ["Goodbye", "Hello / How are you?", "Good Morning", "I'm Sad"],
        correctAnswer: "Hello / How are you?",
        image: require("../../../assets/images/hello.png"),
      },
      {
        question: "What word means 'I'm Happy'?",
        options: ["Masaya", "Malongkot", "Mabuti", "Pa alam"],
        correctAnswer: "Masaya",
        image: require("../../../assets/images/happy.jpg"),
      },
      {
        question: "What is the correct phrase for 'Good Morning'?",
        options: ["Magandang Umaga", "Magandang Gabi", "Masaya", "Malongkot"],
        correctAnswer: "Magandang Umaga",
        image: require("../../../assets/images/morning.jpg"),
      },
      {
        question: "Match the image with the correct word. (Hint: I'm Sad)",
        options: ["Malongkot", "Ikaw", "Pa alam", "Mabuti"],
        correctAnswer: "Malongkot",
        image: require("../../../assets/images/sad.jpg"),
      },
      {
        question: "Fill in the blank: '_____ means I'm Good.'",
        options: ["Malongkot", "Mabuti", "Masaya", "Ikaw"],
        correctAnswer: "Mabuti",
        image: require("../../../assets/images/good.jpg"),
      },
    ],
  },

  {
  id: 2,
  title: "Numbers Quiz",
  accoladeKey: DEMO_ACCOLADES.QUIZZES.QUIZ_2,
  xpReward: 20,
  questions: [
    {
      question: "What is One in Tagalog?",
      options: ["Isa", "Dalawa", "Tatlo", "Apat"],
      correctAnswer: "Isa",
      image: require("../../../assets/images/number1.jpg"),
    },
    {
      question: "What is Two in Tagalog?",
      options: ["Lima", "Apat", "Dalawa", "Isa"],
      correctAnswer: "Dalawa",
      image: require("../../../assets/images/number2.jpg"),
    },
    {
      question: "What is Three in Tagalog?",
      options: ["Tatlo", "Isa", "Lima", "Dalawa"],
      correctAnswer: "Tatlo",
      image: require("../../../assets/images/number3.png"),
    },
    {
      question: "What is Four in Tagalog?",
      options: ["Dalawa", "Apat", "Tatlo", "Lima"],
      correctAnswer: "Apat",
      image: require("../../../assets/images/number4.png"),
    },
    {
      question: "What is Five in Tagalog?",
      options: ["Lima", "Isa", "Apat", "Tatlo"],
      correctAnswer: "Lima",
      image: require("../../../assets/images/number5.png"),
    },
  ],
},
  {
    id: 3,
    title: "Family Quiz",
    accoladeKey: DEMO_ACCOLADES.QUIZZES.QUIZ_3, // ✅ Second quiz → QUIZ_2
    xpReward: 20,
    questions: [
      {
        question: "What is the Filipino word for 'Mother'?",
        options: ["Ama", "Nanay", "Ate", "Kuya"],
        correctAnswer: "Nanay",
        image: require("../../../assets/images/mother.png"),
      },
      {
        question: "What does 'Tatay' mean?",
        options: ["Brother", "Father", "Sister", "Uncle"],
        correctAnswer: "Father",
        image: require("../../../assets/images/father.png"),
      },
      // Add more questions for Quiz 2...
    ],
  },
  
{
  id: 4,
  title: "Colours Quiz",
  accoladeKey: DEMO_ACCOLADES.QUIZZES.QUIZ_4, // ✅ Fourth quiz → QUIZ_4
  xpReward: 20,
  questions: [
    {
      question: "What is the Filipino word for 'Red'?",
      options: ["Pula", "Asul", "Dilaw", "Berde"],
      correctAnswer: "Pula",
      image: require("../../../assets/images/red.jpg"),
    },
    {
      question: "What is the Filipino word for 'Blue'?",
      options: ["Dilaw", "Asul", "Itim", "Puti"],
      correctAnswer: "Asul",
      image: require("../../../assets/images/blue.png"),
    },
    {
      question: "What is the Filipino word for 'Yellow'?",
      options: ["Berde", "Dilaw", "Asul", "Kahel"],
      correctAnswer: "Dilaw",
      image: require("../../../assets/images/yellow.png"),
    },
    {
      question: "What is the Filipino word for 'Green'?",
      options: ["Lila", "Berde", "Kahel", "Puti"],
      correctAnswer: "Berde",
      image: require("../../../assets/images/green.png"),
    },
    {
      question: "What is the Filipino word for 'Black'?",
      options: ["Puti", "Itim", "Rosas", "Kayumanggi"],
      correctAnswer: "Itim",
      image: require("../../../assets/images/black.png"),
    },
  ],
},
{
  id: 5,
  title: "Animals Quiz",
  accoladeKey: DEMO_ACCOLADES.QUIZZES.QUIZ_5, // ✅ Fifth quiz → QUIZ_5
  xpReward: 20,
  questions: [
    {
      question: "What is the correct way to say 'Cat' in Tagalog?",
      options: ["Pusa", "Aso", "Ibon", "Unggoy"],
      correctAnswer: "Pusa",
      image: require("../../../assets/images/cat.png"),
    },
    {
      question: "What is the correct way to say 'Dog' in Tagalog?",
      options: ["Ibon", "Aso", "Tigre", "Isda"],
      correctAnswer: "Aso",
      image: require("../../../assets/images/dog.png"),
    },
    {
      question: "What is the correct way to say 'Bird' in Tagalog?",
      options: ["Unggoy", "Baka", "Ibon", "Baboy"],
      correctAnswer: "Ibon",
      image: require("../../../assets/images/bird.png"),
    },
    {
      question: "How many 'Pusa' (Cats) are there in the game?",
      options: ["1", "2", "3", "4"],
      correctAnswer: "2",
      image: require("../../../assets/images/cat.png"),
    },
    {
      question: "How many 'Unggoy' (Monkeys) are there in the game?",
      options: ["1", "2", "3", "4"],
      correctAnswer: "2",
      image: require("../../../assets/images/monkey.png"),
    },
    {
      question: "What is the correct way to say 'Lion' in Tagalog?",
      options: ["Ahas", "Leon", "Manok", "Baka"],
      correctAnswer: "Leon",
      image: require("../../../assets/images/lion.png"),
    },
    {
      question: "What is the correct way to say 'Snake' in Tagalog?",
      options: ["Ahas", "Isda", "Tigre", "Pusa"],
      correctAnswer: "Ahas",
      image: require("../../../assets/images/snake.png"),
    },
    {
      question: "How many 'Manok' (Chickens) are there in the game?",
      options: ["1", "2", "3", "4"],
      correctAnswer: "2",
      image: require("../../../assets/images/chicken.jpg"),
    },
  ],
},
{
  id: 6,
  title: "Food & Drinks Quiz",
  accoladeKey: DEMO_ACCOLADES.QUIZZES.QUIZ_6, // ✅ Sixth quiz → QUIZ_6
  xpReward: 20,
  questions: [
    {
      question: "What is the correct way to say 'Water' in Tagalog?",
      options: ["Tubig", "Kape", "Gatas", "Sopas"],
      correctAnswer: "Tubig",
      image: require("../../../assets/images/water.png"),
    },
    {
      question: "What is the correct way to say 'Bread' in Tagalog?",
      options: ["Tinapay", "Adobo", "Isda", "Mansanas"],
      correctAnswer: "Tinapay",
      image: require("../../../assets/images/bread.png"),
    },
    {
      question: "What is the correct way to say 'Coffee' in Tagalog?",
      options: ["Gatas", "Sopas", "Kape", "Tubig"],
      correctAnswer: "Kape",
      image: require("../../../assets/images/coffee.png"),
    },
    {
      question: "How many '🍌' (Saging) are in the game?",
      options: ["1", "2", "3", "4"],
      correctAnswer: "2",
      image: require("../../../assets/images/banana.png"),
    },
    {
      question: "What is the correct way to say 'Rice' in Tagalog?",
      options: ["Kanin", "Gatas", "Isda", "Tinapay"],
      correctAnswer: "Kanin",
      image: require("../../../assets/images/rice.png"),
    },
    {
      question: "What is the correct way to say 'Milk' in Tagalog?",
      options: ["Tubig", "Gatas", "Kape", "Saging"],
      correctAnswer: "Gatas",
      image: require("../../../assets/images/milk.png"),
    },
    {
      question: "How many '🥛' (Gatas) are in the game?",
      options: ["1", "2", "3", "4"],
      correctAnswer: "2",
      image: require("../../../assets/images/twoMilk.png"),
    },
    {
      question: "What is the correct way to say 'Chocolate' in Tagalog?",
      options: ["Tsokolate", "Adobo", "Kape", "Mansanas"],
      correctAnswer: "Tsokolate",
      image: require("../../../assets/images/chocolate.png"),
    },
    {
      question: "What is the correct way to say 'Fish' in Tagalog?",
      options: ["Isda", "Saging", "Tubig", "Adobo"],
      correctAnswer: "Isda",
      image: require("../../../assets/images/fish.png"),
    },
    {
      question: "What is the correct way to say 'Soup' in Tagalog?",
      options: ["Sopas", "Tsokolate", "Tinapay", "Tubig"],
      correctAnswer: "Sopas",
      image: require("../../../assets/images/soup.jpg"),
    },
  ],
},


{
  id: 7,
  title: "Hobbies Quiz",
  accoladeKey: DEMO_ACCOLADES.QUIZZES.QUIZ_7, // ✅ Eighth quiz → QUIZ_8
  xpReward: 20,
  questions: [
    {
      question: "How do you say 'Reading' in Tagalog?",
      options: ["Pagluluto", "Pagbabasa", "Pagpipinta", "Pagsasayaw"],
      correctAnswer: "Pagbabasa",
      image: require("../../../assets/images/reading.jpg"),
    },
    {
      question: "What is the Tagalog translation of 'Cooking'?",
      options: ["Pagpipinta", "Pagluluto", "Pagtugtog ng Instrumento", "Pagbabasa"],
      correctAnswer: "Pagluluto",
      image: require("../../../assets/images/cooking.jpg"),
    },
    {
      question: "What hobby is 'Paglalakbay' in English?",
      options: ["Traveling", "Drawing", "Watching Movies", "Gardening"],
      correctAnswer: "Traveling",
      image: require("../../../assets/images/traveling.jpg"),
    },
    {
      question: "How do you say 'Singing' in Tagalog?",
      options: ["Pagpipinta", "Pagluluto", "Pagkanta", "Panonood ng Pelikula"],
      correctAnswer: "Pagkanta",
      image: require("../../../assets/images/singing.jpg"),
    },
    {
      question: "What is the correct way to say 'Gardening' in Tagalog?",
      options: ["Paghahalaman", "Pagluluto", "Paglalakbay", "Pagtugtog ng Instrumento"],
      correctAnswer: "Paghahalaman",
      image: require("../../../assets/images/gardening.jpg"),
    },
    {
      question: "What is 'Pagsasayaw' in English?",
      options: ["Dancing", "Drawing", "Cooking", "Gardening"],
      correctAnswer: "Dancing",
      image: require("../../../assets/images/dancing.jpg"),
    },
    {
      question: "What is the Tagalog translation of 'Drawing'?",
      options: ["Pagluluto", "Paglalakbay", "Pagpipinta", "Pagkanta"],
      correctAnswer: "Pagpipinta",
      image: require("../../../assets/images/drawing.jpg"),
    },
    {
      question: "What hobby is 'Pagtugtog ng Instrumento' in English?",
      options: ["Playing Instruments", "Traveling", "Gardening", "Singing"],
      correctAnswer: "Playing Instruments",
      image: require("../../../assets/images/music.jpg"),
    },
    {
      question: "What is the correct way to say 'Watching Movies' in Tagalog?",
      options: ["Pagluluto", "Paghahalaman", "Panonood ng Pelikula", "Paglalakbay"],
      correctAnswer: "Panonood ng Pelikula",
      image: require("../../../assets/images/movies.jpg"),
    },
    {
      question: "What is 'Ano ang iyong libangan?' in English?",
      options: [
        "What is your hobby?",
        "Do you like to cook?",
        "What do you do on Saturdays?",
        "Do you enjoy singing?",
      ],
      correctAnswer: "What is your hobby?",
      image: null,
    },
  ],
},
{
  id: 8,
  title: "Clothes Quiz",
  accoladeKey: DEMO_ACCOLADES.QUIZZES.QUIZ_8, // ✅ Seventh quiz → QUIZ_7
  xpReward: 20,
  questions: [
    {
      question: "What is the correct way to say 'Red Shirt' in Tagalog?",
      options: ["Pulang Kamiseta", "Asul na Kamiseta", "Dilaw na Kamiseta", "Puting Kamiseta"],
      correctAnswer: "Pulang Kamiseta",
      image: require("../../../assets/images/red_shirt.jpg"),
    },
    {
      question: "What is the correct way to say 'Blue Pants' in Tagalog?",
      options: ["Asul na Pantalon", "Berdeng Pantalon", "Dilaw na Pantalon", "Kahel na Pantalon"],
      correctAnswer: "Asul na Pantalon",
      image: require("../../../assets/images/blue_pants.jpg"),
    },
    {
      question: "What is the correct way to say 'Green Dress' in Tagalog?",
      options: ["Berdeng Damit", "Rosang Damit", "Kayumangging Damit", "Dilaw na Damit"],
      correctAnswer: "Berdeng Damit",
      image: require("../../../assets/images/green_dress.jpg"),
    },
    {
      question: "How many 'Black Shoes' (Itim na Sapatos) are shown in the game?",
      options: ["1", "2", "3", "4"],
      correctAnswer: "1",
      image: require("../../../assets/images/black_shoes.jpg"),
    },
    {
      question: "What is the correct way to say 'White Socks' in Tagalog?",
      options: ["Puting Medyas", "Asul na Medyas", "Dilaw na Medyas", "Rosang Medyas"],
      correctAnswer: "Puting Medyas",
      image: require("../../../assets/images/white_socks.jpg"),
    },
    {
      question: "What is the correct way to say 'Yellow Hat' in Tagalog?",
      options: ["Dilaw na Sombrero", "Berdeng Sombrero", "Asul na Sombrero", "Kayumangging Sombrero"],
      correctAnswer: "Dilaw na Sombrero",
      image: require("../../../assets/images/yellow_hat.jpg"),
    },
    {
      question: "What is the correct way to say 'Orange Scarf' in Tagalog?",
      options: ["Kahel na Scarf", "Rosang Scarf", "Lilamg Scarf", "Puting Scarf"],
      correctAnswer: "Kahel na Scarf",
      image: require("../../../assets/images/orange_scarf.jpg"),
    },
    {
      question: "Which of these items is 'Rosang Gwantes' in Tagalog?",
      options: ["Pink Gloves", "Purple Jacket", "Green Dress", "Blue Pants"],
      correctAnswer: "Pink Gloves",
      image: require("../../../assets/images/pink_gloves.jpg"),
    },
    {
      question: "What is the correct way to say 'Purple Jacket' in Tagalog?",
      options: ["Lilamg Dyaket", "Dilaw na Dyaket", "Kahel na Dyaket", "Berdeng Dyaket"],
      correctAnswer: "Lilamg Dyaket",
      image: require("../../../assets/images/purple_jacket.jpg"),
    },
    {
      question: "What is the correct way to say 'Brown Belt' in Tagalog?",
      options: ["Kayumangging Sinturon", "Asul na Sinturon", "Rosang Sinturon", "Dilaw na Sinturon"],
      correctAnswer: "Kayumangging Sinturon",
      image: require("../../../assets/images/brown_belt.jpg"),
    },
  ],
},


{
  id: 9,
  title: "Sentences & Grammar Quiz",
  accoladeKey: DEMO_ACCOLADES.QUIZZES.QUIZ_9, // ✅ Ninth quiz → QUIZ_9
  xpReward: 20,
  questions: [
    {
      question: "Translate the sentence: 'I am happy.'",
      options: ["Ako ay masaya.", "Ikaw ay malungkot.", "Sila ay mabuti.", "Si Juan ay nagbabasa."],
      correctAnswer: "Ako ay masaya.",
      image: null,
    },
    {
      question: "What is the correct way to negate the sentence 'I am happy'?",
      options: ["Ako ay hindi masaya.", "Ikaw ay hindi masaya.", "Sila ay masaya.", "Ako ay masaya."],
      correctAnswer: "Ako ay hindi masaya.",
      image: null,
    },
    {
      question: "Rearrange the sentence: 'malungkot / Ako / ay'.",
      options: ["Ako ay malungkot.", "Ay malungkot Ako.", "Malungkot Ako ay.", "Malungkot ay Ako."],
      correctAnswer: "Ako ay malungkot.",
      image: null,
    },
    {
      question: "Translate the question: 'What are you doing?'",
      options: ["Ano ang ginagawa mo?", "Saan ka pupunta?", "Paano mo ito ginagawa?", "Kailan tayo kakain?"],
      correctAnswer: "Ano ang ginagawa mo?",
      image: null,
    },
    {
      question: "How do you ask: 'Where are you going?' in Tagalog?",
      options: ["Saan ka pupunta?", "Ano ang ginagawa mo?", "Paano mo ito ginagawa?", "Kailan tayo kakain?"],
      correctAnswer: "Saan ka pupunta?",
      image: null,
    },
    {
      question: "Negate the sentence: 'Sila ay naglalaro.'",
      options: [
        "Sila ay hindi naglalaro.",
        "Sila ay hindi mabuti.",
        "Sila ay hindi masaya.",
        "Sila ay naglalaro.",
      ],
      correctAnswer: "Sila ay hindi naglalaro.",
      image: null,
    },
    {
      question: "Translate the sentence: 'They are good.'",
      options: ["Sila ay mabuti.", "Sila ay masaya.", "Sila ay naglalaro.", "Sila ay nagbabasa."],
      correctAnswer: "Sila ay mabuti.",
      image: null,
    },
    {
      question: "Rearrange the sentence: 'ay / Si Ana / nagluluto / ng pagkain'.",
      options: [
        "Si Ana ay nagluluto ng pagkain.",
        "Si Ana ng pagkain ay nagluluto.",
        "Nagluluto ay Si Ana ng pagkain.",
        "Si Ana nagluluto ay ng pagkain.",
      ],
      correctAnswer: "Si Ana ay nagluluto ng pagkain.",
      image: null,
    },
    {
      question: "Translate: 'She is reading a book in the library.'",
      options: [
        "Siya ay nagbabasa ng libro sa aklatan.",
        "Siya ay nagbabasa ng aklat sa kusina.",
        "Siya ay nagluluto ng libro sa aklatan.",
        "Siya ay kumakain ng libro sa aklatan.",
      ],
      correctAnswer: "Siya ay nagbabasa ng libro sa aklatan.",
      image: null,
    },
    {
      question: "Form a question: 'Where are they playing?'",
      options: ["Saan sila naglalaro?", "Ano ang ginagawa nila?", "Paano sila naglalaro?", "Kailan sila pupunta?"],
      correctAnswer: "Saan sila naglalaro?",
      image: null,
    },
  ],
},{
  id: 10,
  title: "Final Recap Quiz",
  accoladeKey: DEMO_ACCOLADES.QUIZZES.QUIZ_10, // ✅ Tenth quiz → QUIZ_10
  xpReward: 30,
  questions: [
    // Family
    {
      question: "What is 'Mother' in Tagalog?",
      options: ["Ama", "Ina", "Lola", "Kuya"],
      correctAnswer: "Ina",
      image: null,
    },

    // Numbers
    {
      question: "What is 'Three' in Tagalog?",
      options: ["Isa", "Dalawa", "Tatlo", "Lima"],
      correctAnswer: "Tatlo",
      image: null,
    },

    // Colours
    {
      question: "What is the Filipino word for 'Green'?",
      options: ["Berde", "Pula", "Asul", "Dilaw"],
      correctAnswer: "Berde",
      image: null,
    },

    // Animals
    {
      question: "What is 'Dog' in Tagalog?",
      options: ["Pusa", "Aso", "Ibon", "Ahas"],
      correctAnswer: "Aso",
      image: null,
    },

    // Food & Drinks
    {
      question: "What is 'Water' in Tagalog?",
      options: ["Tubig", "Gatas", "Kape", "Sopas"],
      correctAnswer: "Tubig",
      image: null,
    },

    // Clothes + Colours
    {
      question: "What is the correct Tagalog for 'White Socks'?",
      options: ["Puting Medyas", "Itim na Medyas", "Asul na Medyas", "Dilaw na Medyas"],
      correctAnswer: "Puting Medyas",
      image: null,
    },

    // Hobbies
    {
      question: "What is 'Watching Movies' in Tagalog?",
      options: ["Pagluluto", "Panonood ng Pelikula", "Pagbabasa", "Paghahalaman"],
      correctAnswer: "Panonood ng Pelikula",
      image: null,
    },

    // Sentences / Grammar
    {
      question: "Translate: 'I am happy.'",
      options: ["Ako ay masaya.", "Ako ay malungkot.", "Sila ay mabuti.", "Saan ka pupunta?"],
      correctAnswer: "Ako ay masaya.",
      image: null,
    },

    // Bonus mixed recap
    {
      question: "What does 'Saan ka pupunta?' mean?",
      options: ["Where are you going?", "What are you doing?", "What is your hobby?", "Are you happy?"],
      correctAnswer: "Where are you going?",
      image: null,
    },

    // Bonus mixed recap
    {
      question: "What is 'Bread' in Tagalog?",
      options: ["Tinapay", "Isda", "Kanin", "Tsokolate"],
      correctAnswer: "Tinapay",
      image: null,
    },
  ],
}

];

// Helper function to get a quiz by ID
export const getQuizById = (id: number): QuizData | undefined => {
  return QUIZZES.find((quiz) => quiz.id === id);
};