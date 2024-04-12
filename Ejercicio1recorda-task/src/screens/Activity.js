import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Activity = ({ activity, onDelete, onEdit }) => {
  return (
    <View style={styles.container}>
      <View style={styles.activityInfo}>
        <Text style={styles.activityName}>{activity.name}</Text>
        <Text style={styles.activityDetails}>{activity.place}</Text>
        <Text style={styles.activityDescription}>{activity.description}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={onEdit}>
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={onDelete}>
          <Text style={styles.buttonText}>Borrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  activityInfo: {
    flex: 1,
  },
  activityName: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  activityDetails: {
    fontSize: 16,
  },
  activityDescription: {
    fontSize: 14,
    marginTop: 5,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#007bff',
  },
  deleteButton: {
    backgroundColor: 'red',
    marginLeft: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Activity;
