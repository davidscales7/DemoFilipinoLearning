import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FilipinoNewTopicScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>New Topic</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default FilipinoNewTopicScreen;
