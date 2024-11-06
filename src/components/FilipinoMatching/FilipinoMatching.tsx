// UkrainianLearning.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FilipinoMatching: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Filipino Matching</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
  },
});

export default FilipinoMatching;
