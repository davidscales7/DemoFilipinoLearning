import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './../navigation/navigation';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

const LoginScreen: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation<LoginScreenNavigationProp>();

    const handleLogin = () => {
        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        })
        .then(response => response.json())
        .then(data => {
            console.log("Login response:", data);
            if (data.token) {
                AsyncStorage.setItem('token', data.token)
                    .then(() => {
                        console.log("Token saved, navigating to Home");
                        navigation.navigate('Home');
                    })
                    .catch(err => console.error("Error saving token:", err));
            } else {
                console.error("Login failed:", data.error);
                Alert.alert('Login failed', 'Please check your credentials.');
            }
        })
        .catch(error => {
            console.error("Network error during login:", error);
            Alert.alert('Network error', 'Please try again.');
        });
    };

    const handleRegisterNavigation = () => {
        // Navigate to the Register screen
        navigation.navigate('RegisterScreen');
    };

    return (
        <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 24, marginBottom: 20 }}>Login</Text>
            <TextInput
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                style={{
                    borderColor: '#ccc',
                    borderWidth: 1,
                    borderRadius: 5,
                    padding: 10,
                    marginBottom: 15,
                    width: '100%',
                }}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={{
                    borderColor: '#ccc',
                    borderWidth: 1,
                    borderRadius: 5,
                    padding: 10,
                    marginBottom: 15,
                    width: '100%',
                }}
            />
            <Button title="Login" onPress={handleLogin} />
            {/* Register Button */}
            <TouchableOpacity onPress={handleRegisterNavigation} style={{ marginTop: 15 }}>
                <Text style={{ color: 'blue', textAlign: 'center' }}>Don't have an account? Register here</Text>
            </TouchableOpacity>
        </View>
    );
};

export default LoginScreen;
