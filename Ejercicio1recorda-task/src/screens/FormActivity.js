import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const FormActivity = ({ activities, onAdd, onEdit, editActivityId, onClose }) => {
  const [name, setName] = useState('');
  const [place, setPlace] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (editActivityId) {
      const activity = activities.find((activity) => activity.id === editActivityId);
      if (activity) {
        setName(activity.name);
        setPlace(activity.place);
        setDescription(activity.description);
        setDueDate(activity.dueDate);
        setEditMode(true);
      }
    }
  }, [editActivityId, activities]);

  const handleSubmit = () => {
    const newActivity = {
      id: editMode ? editActivityId : Date.now(),
      name,
      place,
      description,
      dueDate,
      color: calculateDueDateColor(dueDate), 
   };

    if (editMode) {
      onEdit(newActivity);
    } else {
      onAdd(newActivity);
    }

    setName('');
    setPlace('');
    setDescription('');
    setDueDate('');
    setEditMode(false);
    onClose();
  };

  const calculateDueDateColor = (dueDate) => {
    const today = new Date();
    const dueDateObj = new Date(dueDate);

    if (dueDateObj < today) {
      return 'red';
    } else if (dueDateObj.getDate() === today.getDate()) {
      return 'green';
    } else {
      return 'blue';
    }
  };

   return (
    <View style={styles.container}>
      <Text style={styles.title}>{editMode ? 'Editar Tarea' : 'Agregar Tarea'}</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre"  
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Lugar"  
        value={place}
        onChangeText={setPlace}
      />
      <TextInput
        style={styles.input}
        placeholder="Descripción"  
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Fecha de entrega (DD-MM-YYYY)"  
        value={dueDate}
        onChangeText={setDueDate}
        keyboardType="datetime-local"
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>{editMode ? 'Guardar cambios' : 'Agregar'}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeButtonText}>Cerrar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '100%',
  },
  submitButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: '#dc3545',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default FormActivity;
