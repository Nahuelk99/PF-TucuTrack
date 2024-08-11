import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';

const horariosImages = {
  exprebus: {
    semirapido: {
      habiles: require('../assets/semirapido_habiles.png'),
      domingos: require('../assets/semirapido_domingos.png'),
    },
    comun: {
      habiles: require('../assets/comun_habiles.png'),
      domingos: require('../assets/comun_domingos.png'),
    },
  },
  tesa: {
    habiles: require('../assets/tesa_habiles.png'),
    sabados: require('../assets/tesa_sabados.png'),
    domingos: require('../assets/tesa_domingos.png'),
  },
};

const Horarios = () => {
  const [tipoTransporte, setTipoTransporte] = useState('exprebus');
  const [tipoExprebus, setTipoExprebus] = useState('semirapido');
  const [dia, setDia] = useState('habiles');

  const getImageSource = () => {
    if (tipoTransporte === 'exprebus') {
      return horariosImages.exprebus[tipoExprebus][dia];
    }
    return horariosImages.tesa[dia];
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.header}>
          <Ionicons name="bus" size={50} color="#007AFF" />
          <Text style={styles.headerText}>Horarios</Text>
      </View>

      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Transporte:</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={tipoTransporte}
            style={styles.picker}
            onValueChange={(itemValue) => setTipoTransporte(itemValue)}
          >
            <Picker.Item label="TESA" value="tesa" />
            <Picker.Item label="Exprebus" value="exprebus" />
          </Picker>
        </View>
      </View>

      {tipoTransporte === 'exprebus' && (
        <View style={styles.pickerContainer}>
          <Text style={styles.label}>Tipo de Exprebus:</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={tipoExprebus}
              style={styles.picker}
              onValueChange={(itemValue) => setTipoExprebus(itemValue)}
            >
              <Picker.Item label="Común" value="comun" />
              <Picker.Item label="Semirápido" value="semirapido" />
            </Picker>
          </View>
        </View>
      )}

      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Día:</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={dia}
            style={styles.picker}
            onValueChange={(itemValue) => setDia(itemValue)}
          >
            <Picker.Item label="Días hábiles" value="habiles" />
            {tipoTransporte === 'tesa' && <Picker.Item label="Sábados" value="sabados" />}
            <Picker.Item label="Domingos y feriados" value="domingos" />
          </Picker>
        </View>
      </View>

      <Image source={getImageSource()} style={styles.image} resizeMode="contain" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    marginBottom: 8,
  },
  headerText: {
    fontSize: 24,
    color: '#000',
  },
  pickerContainer: {
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  label: {
    margin: 4,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 5,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  image: {
    width: '100%',
    height: 400,
  },
});

export default Horarios;
