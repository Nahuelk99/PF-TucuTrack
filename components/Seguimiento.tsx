import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Seguimiento = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Vista de Seguimiento</Text>
      {/* Aquí integrarás el mapa y el seguimiento a través de la API de Google Maps */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Seguimiento;
