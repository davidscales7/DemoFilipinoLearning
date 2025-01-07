import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    StyleSheet,
} from 'react-native';
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
            body: JSON.stringify({ username, password }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.token) {
                    AsyncStorage.setItem('token', data.token)
                        .then(() => navigation.navigate('Home'))
                        .catch((err) => console.error('Error saving token:', err));
                } else {
                    Alert.alert('Login failed', 'Please check your credentials.');
                }
            })
            .catch(() => {
                Alert.alert('Network error', 'Please try again.');
            });
    };

    const handleRegisterNavigation = () => {
        navigation.navigate('RegisterScreen');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Log in to your account</Text>

            <TextInput
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                style={styles.input}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
            />

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleRegisterNavigation}>
                <Text style={styles.registerText}>
                    Don't have an account?{' '}
                    <Text style={styles.registerLink}>Register here</Text>
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#6489bd', 
    },
    title: {
        fontSize: 32,
        fontFamily: 'Poppins-Bold', // Replace with your custom font
        color: 'black',
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    subtitle: {
        fontSize: 16,
        color: 'black',
        marginBottom: 30,
    },
    input: {
        width: '100%', // Fixed to meet typing requirements
        padding: 15,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: '#fff',
        marginBottom: 15,
        fontSize: 16,
    },
    loginButton: {
        width: '100%',
        padding: 15,
        borderRadius: 8,
        backgroundColor: '#336699', // Updated to a darker blue for better contrast
        alignItems: 'center',
        marginBottom: 20,
    },
    loginButtonText: {
        color: '#fff', // Keep white text for high contrast
        fontSize: 18,
        fontWeight: '600',
    },
    registerText: {
        fontSize: 14,
        color: '#d6e4ff', // Light blue for better readability
        textAlign: 'center',
    },
    registerLink: {
        color: '#ffffff', // Make the "Register here" text white
        fontWeight: '600',
    },
});

export default LoginScreen;
