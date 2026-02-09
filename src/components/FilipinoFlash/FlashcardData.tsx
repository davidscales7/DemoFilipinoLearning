// src/screens/FilipinoFlashcards/FlashcardData.ts
import { Accolade } from "../../store/useAccoladeStore";
import { DEMO_ACCOLADES } from "../demo/DemoAccolades";

export type FlashcardItem = {
  front: string;
  back: string;
  frontImageSrc: any;
  backImageSrc: any;
  soundSrc?: any;
  image?: any;
};

export type FlashcardSetData = {
  id: number;
  title: string;
  accoladeKey: Accolade;
  xpReward: number;
  xpPerCard: number;
  cards: FlashcardItem[];
};

export const FLASHCARD_SETS: FlashcardSetData[] = [
  {
    id: 1,
    title: "Greetings",
    accoladeKey: DEMO_ACCOLADES.FLASHCARDS.FLASHCARDS_1,
    xpReward: 20, // Completion bonus
    xpPerCard: 5,
    cards: [
      {
        front: "Hello",
        back: "Kamusta",
        frontImageSrc: require('../../../assets/images/FlagPhilippines.png'),
        backImageSrc: require("../../../assets/images/hello.png"),
        soundSrc: require("../../../assets/Voice/Kamusta.mp3"),
      },
      {
        front: "Good Morning",
        back: "Magandang Umaga",
        frontImageSrc: require('../../../assets/images/FlagPhilippines.png'),
        backImageSrc: require("../../../assets/images/morning.jpg"),
        soundSrc: require("../../../assets/Voice/MagandangUmaga.mp3"),
      },
      {
        front: "I'm Good",
        back: "Mabuti",
        frontImageSrc: require('../../../assets/images/FlagPhilippines.png'),
        backImageSrc: require("../../../assets/images/good.jpg"),
        soundSrc: require("../../../assets/Voice/Mabuti.mp3"),
      },
      {
        front: "I'm Happy",
        back: "Masaya",
        frontImageSrc: require('../../../assets/images/FlagPhilippines.png'),
        backImageSrc: require("../../../assets/images/happy.jpg"),
        soundSrc: require("../../../assets/Voice/Masaya.mp3"),
      },
      {
        front: "I'm Sad",
        back: "Malongkot",
        frontImageSrc: require('../../../assets/images/FlagPhilippines.png'),
        backImageSrc: require("../../../assets/images/sad.jpg"),
        soundSrc: require("../../../assets/Voice/Malungkot.mp3"),
      }
    ],
  },
  {
    id: 2,
    title: "Animals",
    accoladeKey: DEMO_ACCOLADES.FLASHCARDS.FLASHCARDS_1, // Update when you add more accolades
    xpReward: 20,
    xpPerCard: 5,
    cards: [
      {
        front: "Cat",
        back: "Pusa",
        frontImageSrc: require('../../../assets/images/FlagPhilippines.png'),
        backImageSrc: require('../../../assets/images/cat.png'),
        soundSrc: require("../../../assets/Voice/pusa.mp3"),
      },
      {
        front: "Dog",
        back: "Aso",
        soundSrc: require("../../../assets/Voice/aso.mp3"),
        frontImageSrc: require('../../../assets/images/FlagPhilippines.png'),
        backImageSrc: require('../../../assets/images/dog.png'),
      },
      {
        front: "Bird",
        back: "Ibon",
        soundSrc: require("../../../assets/Voice/ibon.mp3"),
        frontImageSrc: require('../../../assets/images/FlagPhilippines.png'),
        backImageSrc: require('../../../assets/images/bird.png'),      
      }
      ,
      {
        front: "Monkey",
        back: "Unggoy",
        frontImageSrc: require('../../../assets/images/FlagPhilippines.png'),
        backImageSrc: require('../../../assets/images/monkey.png'),
        soundSrc: require("../../../assets/Voice/unggoy.mp3"),
      },
      {
        front: "Tiger",
        back: "Tigre",
          frontImageSrc: require('../../../assets/images/FlagPhilippines.png'),
          backImageSrc: require('../../../assets/images/tiger.png'),
        soundSrc: require("../../../assets/Voice/tigre.mp3"),
      },
      {
        front: "Fish",
        back: "Isda",
        frontImageSrc: require('../../../assets/images/FlagPhilippines.png'),
        backImageSrc: require('../../../assets/images/fish.png'),
        soundSrc: require("../../../assets/Voice/isda.mp3"),
      },
      {
        front: "Lion",
        back: "Leon",
        frontImageSrc: require('../../../assets/images/FlagPhilippines.png'),
        backImageSrc: require('../../../assets/images/lion.png'),
        soundSrc: require("../../../assets/Voice/leon.mp3"),
      },
      {
        front: "Snake",
        back: "Ahas",
        frontImageSrc: require('../../../assets/images/FlagPhilippines.png'),
        backImageSrc: require('../../../assets/images/snake.png'),
        soundSrc: require("../../../assets/Voice/ahas.mp3"),
      },
      {
        front: "Cow",
        back: "Baka",
        frontImageSrc: require('../../../assets/images/FlagPhilippines.png'),
        backImageSrc: require('../../../assets/images/cow.png'),
        soundSrc: require("../../../assets/Voice/baka.mp3"),
      },
      {
        front: "Goat",
        back: "Kambing",
        frontImageSrc: require('../../../assets/images/FlagPhilippines.png'),
        backImageSrc: require('../../../assets/images/goat.png'),
        soundSrc: require("../../../assets/Voice/kambing.mp3"),
      },
      {
        front: "Pig",
        back: "Baboy",
        frontImageSrc: require('../../../assets/images/FlagPhilippines.png'),
        backImageSrc: require('../../../assets/images/pig.png'),
        soundSrc: require("../../../assets/Voice/baboy.mp3"),
      },
    ],
  },



  {id: 3,
    title: "Body Parts",
    accoladeKey: DEMO_ACCOLADES.FLASHCARDS.FLASHCARDS_3, // Update when you add more accolades
    xpReward: 20,
    xpPerCard: 5,
    cards: [ {
      front: 'Eye',
      back: 'Mata',
      frontImageSrc: require('../../../assets/images/FlagPhilippines.png'),
      backImageSrc: require('../../../assets/images/eye.jpg'),
      soundSrc: require('../../../assets/Voice/Mata.mp3'),
    },
    {
      front: 'Eyes',
      back: 'Mga Mata',
      frontImageSrc: require('../../../assets/images/FlagPhilippines.png'),
      backImageSrc: require('../../../assets/images/eyes.jpg'),
      soundSrc: require('../../../assets/Voice/MgaMata.mp3'),
    },
    {
      front: 'Nose',
      back: 'Ilong',
      frontImageSrc: require('../../../assets/images/FlagPhilippines.png'),
      backImageSrc: require('../../../assets/images/nose.jpg'),
      soundSrc: require('../../../assets/Voice/Ilong.mp3'),
    },
    {
      front: 'Ears',
      back: 'Tainga',
      frontImageSrc: require('../../../assets/images/FlagPhilippines.png'),
      backImageSrc: require('../../../assets/images/ears.jpg'),
      soundSrc: require('../../../assets/Voice/Tainga.mp3'),
    },
    {
      front: 'Finger',
      back: 'Daliri',
      frontImageSrc: require('../../../assets/images/FlagPhilippines.png'),
      backImageSrc: require('../../../assets/images/finger.png'),
      soundSrc: require('../../../assets/Voice/Daliri.mp3'),
    },
    {
      front: 'Hand',
      back: 'Kamay',
      frontImageSrc: require('../../../assets/images/FlagPhilippines.png'),
      backImageSrc: require('../../../assets/images/hand.jpg'),
      soundSrc: require('../../../assets/Voice/Kamay.mp3'),
    },
    {
      front: 'Feet',
      back: 'Paa',
      frontImageSrc: require('../../../assets/images/FlagPhilippines.png'),
      backImageSrc: require('../../../assets/images/feet.jpg'),
      soundSrc: require('../../../assets/Voice/Paa.mp3'),
    }]

  },
  // Add more sets for Numbers, Family, Body Parts, Colours, etc.
];

export const getFlashcardSetById = (id: number): FlashcardSetData | undefined => {
  return FLASHCARD_SETS.find((set) => set.id === id);
};