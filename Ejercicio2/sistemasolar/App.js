import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import mercurioImg from './src/utils/img/mercurio.jpg';
import venusImg from './src/utils/img/Venus.jpg';
import tierraImg from './src/utils/img/tierra.jpg';
import marteImg from './src/utils/img/marte.jpg';
import jupiterImg from './src/utils/img/Jupiter.jpg';
import saturnoImg from './src/utils/img/saturno.jpg';
import uranoImg from './src/utils/img/Urano.png';
import neptunoImg from './src/utils/img/neptuno.jpg';
import plutonImg from './src/utils/img/pluton.jpg';
import erisImg from './src/utils/img/eris.jpg';
import solImg from './src/utils/img/sol.jpg';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const getImagen = (nombre) => {
  switch (nombre) {
    case 'Mercurio':
      return mercurioImg;
    case 'Venus':
      return venusImg;
    case 'Tierra':
      return tierraImg;
    case 'Marte':
      return marteImg;
    case 'Júpiter':
      return jupiterImg;
    case 'Saturno':
      return saturnoImg;
    case 'Urano':
      return uranoImg;
    case 'Neptuno':
      return neptunoImg;
    case 'Plutón':
      return plutonImg;
    case 'Eris':
      return erisImg;
    case 'Sol':
      return solImg;  
    default:
      return null;
  }
};

const App = () => {
  const [elementos, setElementos] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('https://66173753ed6b8fa434822e15.mockapi.io/Sistemasolar')
      .then(response => response.json())
      .then(data => {
        setElementos(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const SistemaSolarScreen = ({ navigation }) => <CategoriaScreen categoria="Sistema Solar" navigation={navigation} />;
  const TierraScreen = ({ navigation }) => <CategoriaScreen categoria="Tierra" navigation={navigation} />;
  const SolScreen = ({ navigation }) => <CategoriaScreen categoria="Sol" navigation={navigation} />;

  const CategoriaScreen = ({ categoria, navigation }) => {
    const renderItem = ({ item }) => (
      <TouchableOpacity onPress={() => navigation.navigate('Detalle', { elemento: item })}>
        <View style={styles.itemContainer}>
          <Image
            source={getImagen(item.nombre)}
            style={styles.itemImage}
          />
          <Text style={styles.itemText}>{item.nombre}</Text>
        </View>
      </TouchableOpacity>
    );

    const filteredData = elementos.filter(item => item.nombre.toLowerCase().includes(search.toLowerCase()));

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Aplicación de Sistema Solar - {categoria}</Text>
        <TextInput
          placeholder="Buscar..."
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
        <FlatList
          data={filteredData}
          keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
          renderItem={renderItem}
        />
      </View>
    );
  };

  const DetalleScreen = ({ route }) => {
    const { elemento } = route.params;

    return (
      <View style={styles.detailContainer}>
        <Image
          source={getImagen(elemento.nombre)}
          style={styles.detailImage}
        />
        <View style={styles.detailText}>
          <Text>{elemento.nombre}</Text>
          <Text>Tipo: {elemento.tipo}</Text>
          <Text>Masa: {elemento.masa}</Text>
          <Text>Radio: {elemento.radio}</Text>
          <Text>Distancia media al sol: {elemento.distancia_media_al_sol}</Text>
          <Text>Periodo orbital: {elemento.periodo_orbital}</Text>
          <Text>Periodo de rotación: {elemento.periodo_rotacion}</Text>
          <Text>Número de lunas: {elemento.numero_de_lunas}</Text>
        </View>
      </View>
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home">
          {() => (
            <Tab.Navigator>
              <Tab.Screen name="Sistema Solar" component={SistemaSolarScreen} />
              <Tab.Screen name="Tierra" component={TierraScreen} />
              <Tab.Screen name="Sol" component={SolScreen} />
            </Tab.Navigator>
          )}
        </Stack.Screen>
        <Stack.Screen name="Detalle" component={DetalleScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  itemText: {
    fontSize: 16,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
    marginVertical: 8,
  },
  detailContainer: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  detailImage: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  detailText: {
    flex: 1,
  },
});

export default App;
