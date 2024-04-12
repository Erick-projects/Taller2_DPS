import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { styles } from '../utilis/styles';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = () => {
    if (!username || !password) {
      setErrorMessage('Ingrese su nombre de usuario y contraseña.'); 
      return;
    }

    console.log('Login en proceso...');
    navigation.navigate('Activities');
  };

  const handleRegisterNavigation = () => {
    navigation.navigate('Register'); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title2}>RecordaTask</Text>
      <Text style={styles.title}>Inicio de sesion</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre de usuario"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Iniciar sesion</Text>
      </TouchableOpacity>

      {errorMessage && (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      )}

      <TouchableOpacity onPress={handleRegisterNavigation}>
        <Text style={styles.registerText}>Crear una nueva cuenta</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;


