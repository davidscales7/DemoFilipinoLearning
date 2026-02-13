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
  },{
  id: 2,
  title: "Numbers",
  accoladeKey: DEMO_ACCOLADES.FLASHCARDS.FLASHCARDS_2,
  xpReward: 20,
  xpPerCard: 5,
  cards: [
    {
      front: "One",
      back: "Isa",
      frontImageSrc: require("../../../assets/images/FlagPhilippines.png"),
      backImageSrc: require("../../../assets/images/number1.jpg"),
     
    },
    {
      front: "Two",
      back: "Dalawa",
      frontImageSrc: require("../../../assets/images/FlagPhilippines.png"),
      backImageSrc: require("../../../assets/images/number2.jpg"),
      
    },
    {
      front: "Three",
      back: "Tatlo",
      frontImageSrc: require("../../../assets/images/FlagPhilippines.png"),
      backImageSrc: require("../../../assets/images/number3.png"),
    
    },
    {
      front: "Four",
      back: "Apat",
      frontImageSrc: require("../../../assets/images/FlagPhilippines.png"),
      backImageSrc: require("../../../assets/images/number4.png"),
      
    },
    {
      front: "Five",
      back: "Lima",
      frontImageSrc: require("../../../assets/images/FlagPhilippines.png"),
      backImageSrc: require("../../../assets/images/number5.png"),
      
    },
    {
      front: "Six",
      back: "Anim",
      frontImageSrc: require("../../../assets/images/FlagPhilippines.png"),
      backImageSrc: require("../../../assets/images/number6.png"),
     
    },
    {
      front: "Seven",
      back: "Pito",
      frontImageSrc: require("../../../assets/images/FlagPhilippines.png"),
      backImageSrc: require("../../../assets/images/number7.png"),
     
    },
    {
      front: "Eight",
      back: "Walo",
      frontImageSrc: require("../../../assets/images/FlagPhilippines.png"),
      backImageSrc: require("../../../assets/images/number8.png"),
    },
    {
      front: "Nine",
      back: "Siyam",
      frontImageSrc: require("../../../assets/images/FlagPhilippines.png"),
      backImageSrc: require("../../../assets/images/number9.png"),
     
    },
    {
      front: "Ten",
      back: "Sampu",
      frontImageSrc: require("../../../assets/images/FlagPhilippines.png"),
      backImageSrc: require("../../../assets/images/number10.png"),
     },
  ],
},

  {id: 3,
    title: "Family",
    accoladeKey: DEMO_ACCOLADES.FLASHCARDS.FLASHCARDS_3, // Update when you add more accolades
    xpReward: 20,
    xpPerCard: 5,
    cards: [ 
  
  { front: "Father", back: "Ama", frontImageSrc: require("../../../assets/images/FlagPhilippines.png"), backImageSrc: require("../../../assets/images/father.png"),  },
  { front: "Mother", back: "Ina", frontImageSrc: require("../../../assets/images/FlagPhilippines.png"), backImageSrc: require("../../../assets/images/mother.png"),  },
  { front: "Brother", back: "Kapatid na Lalaki", frontImageSrc: require("../../../assets/images/FlagPhilippines.png"), backImageSrc: require("../../../assets/images/brother.png"), },
  { front: "Sister", back: "Kapatid na Babae", frontImageSrc: require("../../../assets/images/FlagPhilippines.png"), backImageSrc: require("../../../assets/images/sister.png"), },

  { front: "Grandfather", back: "Lolo", frontImageSrc: require("../../../assets/images/FlagPhilippines.png"), backImageSrc: require("../../../assets/images/grandad.png"),  },
  { front: "Grandmother", back: "Lola", frontImageSrc: require("../../../assets/images/FlagPhilippines.png"), backImageSrc: require("../../../assets/images/grandma.png"),  },

  { front: "Son", back: "Anak na Lalaki", frontImageSrc: require("../../../assets/images/FlagPhilippines.png"), backImageSrc: require("../../../assets/images/son.png"), },
  { front: "Daughter", back: "Anak na Babae", frontImageSrc: require("../../../assets/images/FlagPhilippines.png"), backImageSrc: require("../../../assets/images/daughter.png"),  },

    
]},

 {id: 4,
    title: "Colours",
    accoladeKey: DEMO_ACCOLADES.FLASHCARDS.FLASHCARDS_4, // Update when you add more accolades
    xpReward: 20,
    xpPerCard: 5,
    cards: [
      { front: "Red", back: "Pula", frontImageSrc: require("../../../assets/images/FlagPhilippines.png"), backImageSrc: require("../../../assets/images/red.jpg"),  },
      { front: "Blue", back: "Asul", frontImageSrc: require("../../../assets/images/FlagPhilippines.png"), backImageSrc: require("../../../assets/images/blue.png"),  },
      { front: "Green", back: "Berde", frontImageSrc: require("../../../assets/images/FlagPhilippines.png"), backImageSrc: require("../../../assets/images/green.png"),  },
      { front: "Yellow", back: "Dilaw", frontImageSrc: require("../../../assets/images/FlagPhilippines.png"), backImageSrc: require("../../../assets/images/yellow.png"),  },
      { front: "Black", back: "Itim", frontImageSrc: require("../../../assets/images/FlagPhilippines.png"), backImageSrc: require("../../../assets/images/black.png"),  },
      { front: "White", back: "Puti", frontImageSrc: require("../../../assets/images/FlagPhilippines.png"), backImageSrc: require("../../../assets/images/white.png"),  },
      { front: "Purple", back: "Lila", frontImageSrc: require("../../../assets/images/FlagPhilippines.png"), backImageSrc: require("../../../assets/images/purple.jpg"),  },
      { front: "Orange", back: "Kahel", frontImageSrc: require("../../../assets/images/FlagPhilippines.png"), backImageSrc: require("../../../assets/images/orange.png"),  },
    ],
  },
   {id: 5,
    title: "Animals",
    accoladeKey: DEMO_ACCOLADES.FLASHCARDS.FLASHCARDS_5, // Update when you add more accolades
    xpReward: 20,
    xpPerCard: 5,
    cards: [
      { front: "Dog", back: "Aso", frontImageSrc: require("../../../assets/images/FlagPhilippines.png"), backImageSrc: require("../../../assets/images/dog.png"),  },
      { front: "Cat", back: "Pusa", frontImageSrc: require("../../../assets/images/FlagPhilippines.png"), backImageSrc: require("../../../assets/images/cat.png"),  },
      { front: "Bird", back: "Ibon", frontImageSrc: require("../../../assets/images/FlagPhilippines.png"), backImageSrc: require("../../../assets/images/bird.png"),  },
      { front: "Fish", back: "Isda", frontImageSrc: require("../../../assets/images/FlagPhilippines.png"), backImageSrc: require("../../../assets/images/fish.png"),  },
      { front: "Cow", back: "Baka", frontImageSrc: require("../../../assets/images/FlagPhilippines.png"), backImageSrc: require("../../../assets/images/cow.png"),  },
      { front: "Pig", back: "Baboy", frontImageSrc: require("../../../assets/images/FlagPhilippines.png"), backImageSrc: require("../../../assets/images/pig.png"),  },
      { front: "Horse", back: "Kabayo", frontImageSrc: require("../../../assets/images/FlagPhilippines.png"), backImageSrc: require("../../../assets/images/horse.png"),  },
      { front: "Chicken", back: "Manok", frontImageSrc: require("../../../assets/images/FlagPhilippines.png"), backImageSrc: require("../../../assets/images/chicken.jpg"),  },
    ],
  },
   {id: 6,
    title: "Food & Drink",
    accoladeKey: DEMO_ACCOLADES.FLASHCARDS.FLASHCARDS_6, // Update when you add more accolades
    xpReward: 20,
    xpPerCard: 5,
    cards: [
      { front: "Water", back: "Tubig", frontImageSrc: require("../../../assets/images/FlagPhilippines.png"), backImageSrc: require("../../../assets/images/water.png"),  },
      { front: "Rice", back: "Kanin", frontImageSrc: require("../../../assets/images/FlagPhilippines.png"), backImageSrc: require("../../../assets/images/rice.png"),  },
      { front: "Bread", back: "Tinapay", frontImageSrc: require("../../../assets/images/FlagPhilippines.png"), backImageSrc: require("../../../assets/images/bread.png"),  },
      { front: "Chicken Ad obo", back: "Adobong Manok", frontImageSrc: require("../../../assets/images/FlagPhilippines.png"), backImageSrc: require("../../../assets/images/chicken.jpg"),  
      },
    ],
  },
   {id: 7,
    title: "Hobbies",
    accoladeKey: DEMO_ACCOLADES.FLASHCARDS.FLASHCARDS_7, // Update when you add more accolades
    xpReward: 20,
    xpPerCard: 5,
    cards: [
      { front: "Playing Basketball", back: "Naglalaro ng Basketball", frontImageSrc: require("../../../assets/images/FlagPhilippines.png"), backImageSrc: require("../../../assets/images/basketball.png"),  },
      { front: "Playing Video Games", back: "Naglalaro ng Video Games", frontImageSrc: require("../../../assets/images/FlagPhilippines.png"), backImageSrc: require("../../../assets/images/videogames.png"),  },
      { front: "Cooking", back: "Nagluluto", frontImageSrc: require("../../../assets/images/FlagPhilippines.png"), backImageSrc: require("../../../assets/images/cooking.png"),  },
      { front: "Traveling", back: "Naglalakbay", frontImageSrc: require("../../../assets/images/FlagPhilippines.png"), backImageSrc: require("../../../assets/images/travelling.png"),  },
    ],
  },
  // Add more sets for Numbers, Family, Body Parts, Colours, etc.
{id: 8,
    title: "Clothes",
    accoladeKey: DEMO_ACCOLADES.FLASHCARDS.FLASHCARDS_8, // Update when you add more accolades
    xpReward: 20,
    xpPerCard: 5,
    cards: [
      { front: "Shirt", back: "Polo", frontImageSrc: require("../../../assets/images/FlagPhilippines.png"), backImageSrc: require("../../../assets/images/shirt.png"),  },
      { front: "Pants", back: "Pantalon", frontImageSrc: require("../../../assets/images/FlagPhilippines.png"), backImageSrc: require("../../../assets/images/pants.png"),  },
      { front: "Shoes", back: "Sapatos", frontImageSrc: require("../../../assets/images/FlagPhilippines.png"), backImageSrc: require("../../../assets/images/shoes.png"),  },
      { front: "Hat", back: "Sombrero", frontImageSrc: require("../../../assets/images/FlagPhilippines.png"), backImageSrc: require("../../../assets/images/hat.png"),  },
    ],
  },
  {id: 9,
    title: "Sentence Structure",
    accoladeKey: DEMO_ACCOLADES.FLASHCARDS.FLASHCARDS_9, // Update when you add more accolades
    xpReward: 20,
    xpPerCard: 5,
    cards: [
      { front: "I am eating rice.", back: "Kumakain ako ng kanin.", frontImageSrc: require("../../../assets/images/FlagPhilippines.png"), backImageSrc: require("../../../assets/images/eating.png"),  },
      { front: "She is playing basketball.", back: "Naglalaro siya ng basketball.", frontImageSrc: require("../../../assets/images/FlagPhilippines.png"), backImageSrc: require("../../../assets/images/basketball.png"),  },
      { front: "We are traveling to the beach.", back: "Naglalakbay kami sa beach.", frontImageSrc: require("../../../assets/images/FlagPhilippines.png"), backImageSrc: require("../../../assets/images/travelling.png"),  },
      { front: "They are cooking adobo.", back: "Nagluluto sila ng adobo.", frontImageSrc: require("../../../assets/images/FlagPhilippines.png"), backImageSrc: require("../../../assets/images/cooking.png"),  },
    ],
  },
  {id: 10,
    title: "Household Items",
    accoladeKey: DEMO_ACCOLADES.FLASHCARDS.FLASHCARDS_10,
    xpReward: 20,
    xpPerCard: 5,
    cards: [
      { front: "Table", back: "Mesa", frontImageSrc: require("../../../assets/images/FlagPhilippines.png"), backImageSrc: require("../../../assets/images/table.png"),  },
      { front: "Chair", back: "Silya", frontImageSrc: require("../../../assets/images/FlagPhilippines.png"), backImageSrc: require("../../../assets/images/chair.png"),  },
      { front: "Bed", back: "Kama", frontImageSrc: require("../../../assets/images/FlagPhilippines.png"), backImageSrc: require("../../../assets/images/bed.png"),  },
      { front: "Door", back: "Pinto", frontImageSrc: require("../../../assets/images/FlagPhilippines.png"), backImageSrc: require("../../../assets/images/door.png"),  },
    ],
  },

   {id: 11,
    title: "General Vocabulary",
    accoladeKey: DEMO_ACCOLADES.FLASHCARDS.FLASHCARDS_11,
    xpReward: 20,
    xpPerCard: 5,
    cards: [
      { front: "Love", back: "Pag-ibig", frontImageSrc: require("../../../assets/images/FlagPhilippines.png"), backImageSrc: require("../../../assets/images/love.png"),  },
      { front: "Friend", back: "Kaibigan", frontImageSrc: require("../../../assets/images/FlagPhilippines.png"), backImageSrc: require("../../../assets/images/friend.png"),  },
      { front: "Happy", back: "Masaya", frontImageSrc: require("../../../assets/images/FlagPhilippines.png"), backImageSrc: require("../../../assets/images/happy.jpg"),  },
      { front: "Sad", back: "Malungkot", frontImageSrc: require("../../../assets/images/FlagPhilippines.png"), backImageSrc: require("../../../assets/images/sad.jpg"),  }, 
      
    ],
  },




  // Add more sets for Numbers, Family, Body Parts, Colours, etc.
];

export const getFlashcardSetById = (id: number): FlashcardSetData | undefined => {
  return FLASHCARD_SETS.find((set) => set.id === id);
};