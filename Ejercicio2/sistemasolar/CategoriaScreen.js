import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

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

  const CategoriaScreen = ({ navigation }) => {
    const renderItem = ({ item }) => (
      <TouchableOpacity onPress={() => navigation.navigate('Detalle', { elemento: item })}>
        <View style={styles.itemContainer}>
          <Image
            source={{ uri: item.imagen }}
            style={styles.itemImage}
          />
          <Text style={styles.itemText}>{item.nombre}</Text>
        </View>
      </TouchableOpacity>
    );

    const filteredData = elementos.filter(item => item.nombre.toLowerCase().includes(search.toLowerCase()));

    return (
      <View>
        <Text>Aplicación de Sistema Solar</Text>
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
          source={{ uri: elemento.imagen }}
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
        <Stack.Screen name="Home" component={CategoriaScreen} />
        <Stack.Screen name="Detalle" component={DetalleScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
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
    margin: 8,
  },
  detailContainer: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  detailImage: {
    width: 200,
    height: 200,
    marginRight: 10,
  },
  detailText: {
    flex: 1,
  },
});

export default App;
