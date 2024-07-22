// FilipinoLearning.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FilipinoLearning: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Filipino Learning</Text>
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

export default FilipinoLearning;
