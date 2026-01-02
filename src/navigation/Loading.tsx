
import React, { useState } from 'react';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';




function Loading() {

  const navigation = useNavigation();
  
      
const [initialRoute,setInitialRoute]=useState("Filipino")  

const [loggedIn,setLoggedIn]=useState(null)  
useEffect(( 

) => {
  isLoggedIn()
   
},[])


useEffect(()=> {
  console.log("loggingIn",loggedIn)
if(!loggedIn){
navigation.navigate('Filipino');
}
else{
  navigation.navigate('FilipinoLessons')
}


},[loggedIn])


async function isLoggedIn(){

const token = await AsyncStorage.getItem('token')
setLoggedIn(isTokenExpired(token));
} 





function isTokenExpired(token) {
  try {
      // Split the token to get the payload part
      const payloadBase64 = token.split('.')[1];
      const payloadJson = atob(payloadBase64);
      const payload = JSON.parse(payloadJson);

      // Check if the exp field exists
      if (!payload.exp) {
          console.error('Token does not contain an exp field');
          return true; // Assume expired if no exp field
      }

      // Get the current time in seconds
      const currentTime = Math.floor(Date.now() / 1000);

      // Calculate time remaining
      const timeRemaining = payload.exp - currentTime;

      // Log the time remaining
      if (timeRemaining > 0) {
          console.log(`Time remaining on token: ${timeRemaining} seconds`);
      } else {
          console.log('The token has expired');
      }

      // Compare the current time with the token's expiration time
      return timeRemaining <= 0;
  } catch (error) {
      console.error('Invalid token format', error);
      return true; // Assume expired if the token format is invalid
  }
}





  return (
   <View></View>
   
  );
}

export default Loading;
