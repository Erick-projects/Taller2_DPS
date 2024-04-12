import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Text } from 'react-native'; // Importa Text de react-native
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import ActivitiesScreen from './src/screens/ActivityScreen'; // Cambia ActivityScreen por ActivitiesScreen
import FormActivityScreen from './src/screens/FormActivity'; // Cambia la importación de FormActivity por FormActivityScreen

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen 
          name="Activities"
          component={ActivitiesScreen}
          options={{ 
            title: 'Mis Actividades'
          }}
        />
        <Stack.Screen 
          name="FormActivity" 
          component={FormActivityScreen} // Cambia FormActivity por FormActivityScreen
          options={{ 
            title: 'Actividad'
          }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

