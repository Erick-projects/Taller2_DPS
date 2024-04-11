import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const DetalleScreen = ({ route }) => {
  const { elemento } = route.params;

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: elemento.imagen }}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.details}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
  image: {
    width: '80%',
    height: 200,
    marginBottom: 16,
  },
  details: {
    alignItems: 'flex-start',
  },
});

export default DetalleScreen;
