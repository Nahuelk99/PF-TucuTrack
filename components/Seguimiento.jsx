import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { getAuth } from 'firebase/auth';

const Seguimiento = () => {
  const mapRef = useRef(null);
  const [region, setRegion] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const router = useRouter();
  const auth = getAuth();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      try {
        let location = await Location.getCurrentPositionAsync({});
        setRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      } catch (error) {
        setErrorMsg('Could not fetch location');
        Alert.alert('Error', 'Could not fetch your location. Using default location.');
        setRegion({
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      }
    })();
  }, []);

  const onRegionChangeComplete = (newRegion) => {
    setRegion(newRegion);
  };

  const handleReportPress = () => {
    if (auth.currentUser) {
      router.push('/reportar');
    } else {
      Alert.alert(
        'Iniciar sesión requerido',
        'Debes estar logueado para acceder a esta función.',
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Ir a login', onPress: () => router.push('/login') }
        ]
      );
    }
  };

  const handleLocationPress = async () => {
    try {
      let location = await Location.getCurrentPositionAsync({});
      const newRegion = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
      setRegion(newRegion);
      mapRef.current?.animateToRegion(newRegion, 1000);
    } catch (error) {
      Alert.alert('Error', 'No se pudo obtener tu ubicación actual.');
    }
  };

  if (!region) {
    return null; // O podrías mostrar un indicador de carga aquí
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={region}
        onRegionChangeComplete={onRegionChangeComplete}
        moveOnMarkerPress={false}
        rotateEnabled={false}
      >
        <Marker
          coordinate={{
            latitude: region.latitude,
            longitude: region.longitude,
          }}
          title="Mi ubicación"
        />
        {/* Aquí irían tus Polylines y otros Markers */}
      </MapView>
      <TouchableOpacity style={styles.reportButton} onPress={handleReportPress}>
        <Ionicons name="alert-circle" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.locationButton} onPress={handleLocationPress}>
        <Ionicons name="locate" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  reportButton: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    backgroundColor: 'red',
    borderRadius: 30,
    padding: 10,
  },
  locationButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default Seguimiento;