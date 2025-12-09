import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { XPProvider } from './src/context/XPContext';

export default function App() {
  return (
    <XPProvider>
      <AppNavigator />
      <StatusBar style="auto" />
    </XPProvider>
  );
}

const styles = StyleSheet.create({});
