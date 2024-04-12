import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Activity from './Activity';
import FormActivity from './FormActivity';

const ActivitiesScreen = () => {
  const navigation = useNavigation();
  const [activities, setActivities] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editActivityId, setEditActivityId] = useState(null);

  useEffect(() => {

    const initialActivities = [
      {
        id: 1,
        name: 'Tarea 1',
        place: 'Oficina',
        description: 'Completar el informe mensual',
        dueDate: '2024-04-12',
        color: 'green',
      },
      {
        id: 2,
        name: 'Reunión importante',
        place: 'Sala de conferencias',
        description: 'Discutir el plan de marketing',
        dueDate: '2024-04-15',
        color: 'yellow',
      },
      {
        id: 3,
        name: 'Compra de suministros',
        place: 'Tienda de materiales',
        description: 'Comprar materiales para el proyecto',
        dueDate: '2024-04-20',
        color: 'blue',
      },
    ];
    setActivities(initialActivities);
  }, []);

  const handleOpenForm = () => {
    navigation.navigate('FormActivity');
  };

  const handleAddActivity = (newActivity) => {
    setActivities([...activities, newActivity]);
    setShowForm(false);
  };

  const handleEditActivity = (updatedActivity) => {
    const updatedActivities = activities.map((activity) =>
      activity.id === updatedActivity.id ? updatedActivity : activity
    );
    setActivities(updatedActivities);
    setEditActivityId(null);
  };

  const handleDeleteActivity = (id) => {
    const filteredActivities = activities.filter(
      (activity) => activity.id !== id
    );
    setActivities(filteredActivities);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addButton} onPress={handleOpenForm}>
        <Text style={styles.buttonText}>Agregar actividad</Text>
      </TouchableOpacity>

      <FlatList
        data={activities}
        renderItem={({ item }) => (
          <Activity
            activity={item}
            onDelete={() => handleDeleteActivity(item.id)}
            onEdit={() => handleEditActivity(item)}
            navigation={navigation}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />

      {showForm && (
        <FormActivity
          onAdd={handleAddActivity}
          onClose={() => setShowForm(false)}
          editActivityId={editActivityId}
          activities={activities}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  addButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ActivitiesScreen;
