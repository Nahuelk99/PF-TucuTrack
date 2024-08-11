import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const Reportes = () => {
  const [reportType, setReportType] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const reportTypes = [
    { id: 'accident', name: 'Accidente', icon: 'car' },    
    { id: 'demonstration', name: 'Manifestación', icon: 'megaphone' },
    { id: 'roadwork', name: 'Obras', icon: 'construct' },
    { id: 'others', name: 'Otros', icon: 'alert-circle' },
  ];

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      try {
        let location = await Location.getCurrentPositionAsync({});
        setLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      } catch (error) {
        setErrorMsg('Could not fetch location');
        Alert.alert('Error', 'Could not fetch your location. Using default location.');
        setLocation({
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      }
    })();
  }, []);

  const handleSubmit = () => {
    if (!reportType || !description || !location) {
      Alert.alert('Error', 'Por favor completa todos los campos requeridos');
      return;
    }
    // Aquí iría la lógica para enviar el reporte
    Alert.alert('Éxito', 'Reporte enviado correctamente');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>¿Qué deseas reportar?</Text>
      <View style={styles.reportTypesContainer}>
        {reportTypes.map((type) => (
          <TouchableOpacity
            key={type.id}
            style={[styles.reportTypeButton, reportType === type.id && styles.selectedReportType]}
            onPress={() => setReportType(type.id)}
          >
            <Ionicons name={type.icon} size={24} color={reportType === type.id ? 'white' : 'gray'} />
            <Text style={[styles.reportTypeText, reportType === type.id && styles.selectedReportTypeText]}>{type.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        style={styles.input}
        placeholder="Cuéntanos qué está pasando..."
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Text style={styles.sectionTitle}>Ubicación del incidente</Text>
      {location && (
        <MapView
          style={styles.map}
          initialRegion={location}
          onPress={(e) => setLocation(e.nativeEvent.coordinate)}
        >
          <Marker coordinate={location} />
        </MapView>
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Ionicons name="camera" size={24} color="gray" />
          <Text style={styles.buttonText}>Tomar foto</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Ionicons name="time" size={24} color="gray" />
          <Text style={styles.buttonText}>Duración</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Enviar reporte</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  reportTypesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  reportTypeButton: {
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  selectedReportType: {
    backgroundColor: '#ffa500',
  },
  reportTypeText: {
    marginTop: 8,
    color: 'gray',
  },
  selectedReportTypeText: {
    color: 'white',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 8,
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  map: {
    height: 200,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  button: {
    alignItems: 'center',
  },
  buttonText: {
    color: 'gray',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Reportes;