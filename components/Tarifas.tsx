import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';

const Tarifas = () => {
  const [origen, setOrigen] = useState('Tucumán');
  const [destino, setDestino] = useState('');
  const [tipoViaje, setTipoViaje] = useState('ida');

  const origenes = ['Tucumán', 'Famailla', 'San José', 'Monteros', 'Concepción', 'Aguilares', 'Alberdi', 'La Cocha'];

  const destinos = {
    'Tucumán': [
      { destino: 'Famailla', ida: 1900, idaVuelta: 3600, anticipado: 1330 },
      { destino: 'San José', ida: 2250, idaVuelta: 4200, anticipado: 1550 },
      { destino: 'Río Colorado', ida: 2670, idaVuelta: 5000, anticipado: 1850 },
      { destino: 'Acheral', ida: 2250, idaVuelta: 4300, anticipado: 1575 },
      { destino: 'Monteros', ida: 2400, idaVuelta: 4600, anticipado: 1680 },
      { destino: 'León Rouges', ida: 3000, idaVuelta: 5700, anticipado: 2100 },
      { destino: 'Vº Quinteros/R. Seco', ida: 3400, idaVuelta: 6500, anticipado: 2380 },
      { destino: 'Arcadia/Concepción', ida: 3650, idaVuelta: 6900, anticipado: 2555 },
      { destino: 'Aguilares', ida: 4000, idaVuelta: 7600, anticipado: 2800 },
      { destino: 'Santa Ana, Río Chico, Vº Belgrano y Alberdi', ida: 4300, idaVuelta: 8200, anticipado: 3010 },
      { destino: 'Los Arroyos y La Invernada', ida: 4800, idaVuelta: 9100, anticipado: 3360 },
      { destino: 'La Florida/La Salvación/S. José/La Cocha y Los Pizarro', ida: 4850, idaVuelta: 9200, anticipado: 3395 },
    ],
    'Famailla': [
      { destino: 'San José', ida: 670, idaVuelta: 1200, anticipado: 470 },
      { destino: 'Río Colorado', ida: 750, idaVuelta: 1400, anticipado: 520 },
      { destino: 'Arcadia/Concepción', ida: 2400, idaVuelta: 4500, anticipado: 1680 },
      { destino: 'Aguilares', ida: 3000, idaVuelta: 5700, anticipado: 2100 },
      { destino: 'Río Chico, Vº Hileret, Santa Ana', ida: 3490, idaVuelta: 6600, anticipado: 2440 },
      { destino: 'Vº Belgrano, Alberdi', ida: 4000, idaVuelta: 7600, anticipado: 2800 },
      { destino: 'Los Arroyos', ida: 4050, idaVuelta: 7700, anticipado: 2835 },
      { destino: 'La Invernada', ida: 4170, idaVuelta: 7900, anticipado: 2920 },
      { destino: 'La Florida, La Salvación y San José', ida: 4300, idaVuelta: 8200, anticipado: 3010 },
      { destino: 'La Cocha y Los Pizarro', ida: 4850, idaVuelta: 9200, anticipado: 3395 },
    ],
    'Monteros': [
      { destino: 'Concepción', ida: 1500, idaVuelta: 2800, anticipado: 1050 },
      { destino: 'Aguilares', ida: 2000, idaVuelta: 3800, anticipado: 1400 },
      { destino: 'Santa Ana, R. Chico, Vº Hileret', ida: 2810, idaVuelta: 5300, anticipado: 1950 },
      { destino: 'Vº Belgrano, Alberdi', ida: 3000, idaVuelta: 5700, anticipado: 2100 },
      { destino: 'Los Arroyos y La Invernada', ida: 3330, idaVuelta: 6300, anticipado: 2350 },
      { destino: 'La Florida, La Salvación y San José', ida: 3490, idaVuelta: 6600, anticipado: 2450 },
      { destino: 'La Cocha y Los Pizarro', ida: 4000, idaVuelta: 7600, anticipado: 2800 },
    ],
    'Concepción': [
      { destino: 'R. Chico, Vº Hileret, Santa Ana', ida: 1500, idaVuelta: 2800, anticipado: 1050 },
      { destino: 'Vº Belgrano, Alberdi', ida: 1900, idaVuelta: 3600, anticipado: 1330 },
      { destino: 'Los Arroyos', ida: 2000, idaVuelta: 3800, anticipado: 1400 },
      { destino: 'La Invernada', ida: 2250, idaVuelta: 4200, anticipado: 1575 },
      { destino: 'La Florida', ida: 2400, idaVuelta: 4500, anticipado: 1680 },
      { destino: 'La Salvación y San José', ida: 2670, idaVuelta: 5000, anticipado: 1870 },
      { destino: 'La Cocha y Los Pizarro', ida: 3000, idaVuelta: 5700, anticipado: 2100 },
    ],
    'Aguilares': [
      { destino: 'Santa Ana y Alberdi', ida: 1160, idaVuelta: 2200, anticipado: 810 },
      { destino: 'Los Arroyos, La Invernada', ida: 1500, idaVuelta: 2800, anticipado: 1050 },
      { destino: 'La Florida', ida: 1650, idaVuelta: 3100, anticipado: 1150 },
      { destino: 'La Salvación/San José', ida: 2000, idaVuelta: 3800, anticipado: 1400 },
      { destino: 'La Cocha y Los Pizarro', ida: 2400, idaVuelta: 4500, anticipado: 1650 },
    ],
    'Alberdi': [
      { destino: 'La Cocha', ida: 1500, idaVuelta: 2800, anticipado: 1050 },
      { destino: 'Los Pizarro', ida: 1900, idaVuelta: 3600, anticipado: 1300 },
    ],
    'La Cocha': [
      { destino: 'Los Pizarro', ida: 670, idaVuelta: 1200 },
    ],
  };
  

  const renderTarifas = () => {
    const tarifasOrigen = destinos[origen] || [];
    const tarifasFiltradas = destino ? tarifasOrigen.filter(tarifa => tarifa.destino === destino) : tarifasOrigen;
  
    return tarifasFiltradas.map((tarifa, index) => (
      <View key={index} style={[styles.row, index % 2 === 0 ? styles.evenRow : styles.oddRow]}>
        <Text style={styles.destinoText}>{tarifa.destino}</Text>
        <Text style={styles.precioText}>${tarifa[tipoViaje]}</Text>
      </View>
    ));
  };
  
  return (
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Ionicons name="bus" size={50} color="#007AFF" />
          <Text style={styles.headerText}>Tarifas</Text>
        </View>

        <View style={styles.pickerContainer}>
          <Text style={styles.label}>Origen:</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={origen}
              onValueChange={(itemValue) => {
                setOrigen(itemValue);
                setDestino(''); // Resetear destino cuando se cambia el origen
              }}
              style={styles.picker}
            >
              {origenes.map((city) => (
                <Picker.Item key={city} label={city} value={city} />
              ))}
            </Picker>
          </View>
        </View>

        {origen !== '' && (
          <View style={styles.pickerContainer}>
            <Text style={styles.label}>Destino:</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={destino}
                onValueChange={(itemValue) => setDestino(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Seleccionar destino" value="" />
                {destinos[origen]?.map((tarifa) => (
                  <Picker.Item key={tarifa.destino} label={tarifa.destino} value={tarifa.destino} />
                ))}
              </Picker>
            </View>
          </View>
        )}

        <View style={styles.tipoViajeContainer}>
          <Text style={styles.label}>Tipo de viaje:</Text>
          <View style={styles.buttonContainer}>
          {['ida', 'idaVuelta', 'anticipado'].map((tipo) => (
            <TouchableOpacity
              key={tipo}
              style={[styles.button, tipoViaje === tipo && styles.selectedButton]}
              onPress={() => setTipoViaje(tipo)}
            >
              <Text style={[styles.buttonText, tipoViaje === tipo && styles.selectedButtonText]}>
                {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}

          </View>
        </View>

        <View style={styles.tarifasContainer}>
          <View style={styles.tableHeader}>
            <Text style={[styles.headerCell, styles.destinoHeader]}>Destino</Text>
            <Text style={styles.headerCell}>Precio</Text>
          </View>
          {renderTarifas()}
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Información sobre pasajes anticipados</Text>
          <Text style={styles.infoText}>• Mínimo VEINTE BOLETOS</Text>
          <Text style={styles.infoText}>• Venta en: Bol. 76 Terminal S. M. Tucumán, Bol. Terminal Concepción, Bol. Terminal Aguilares.</Text>
          <Text style={styles.infoText}>• Validez: 45 días desde el día de emitido.</Text>
          <Text style={styles.infoText}>• Se puede comprar cualquier día del mes.</Text>
          <Text style={styles.infoText}>• PRECIO PUBLICADO ES POR CADA PASAJE</Text>
        </View>
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flexGrow: 1,
  },
  header: {
    alignItems: 'center',
    padding: 16,
  },
  logo: {
    marginBottom: 8,
  },
  headerText: {
    fontSize: 24,
    color: '#000',
  },
  pickerContainer: {
    margin: 16,
  },
  label: {
    margin: 4,
    fontSize: 16,
    fontWeight: 'bold',
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#007AFF', // Borde azul
    borderRadius: 8,
    overflow: 'hidden',
  },
  picker: {
    marginHorizontal: 8,
  },
  tipoViajeContainer: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    padding: 14,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  selectedButton: {
    backgroundColor: '#007AFF',
  },
  buttonText: {
    color: '#000',
  },
  selectedButtonText: {
    color: '#fff',
  },
  tarifasContainer: {
    marginHorizontal: 16,
    marginTop: 16,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  headerCell: {
    flex: 1,
    padding: 8,
    fontSize: 16,
    fontWeight: 'bold',
    borderRightWidth: 1,
    borderColor: '#ccc',
  },
  destinoHeader: {
    flex: 2,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  evenRow: {
    backgroundColor: '#f9f9f9',
  },
  oddRow: {
    backgroundColor: '#fff',
  },
  destinoText: {
    flex: 2,
    padding: 8,
    borderRightWidth: 1,
    borderColor: '#ccc',
  },
  precioText: {
    flex: 1,
    padding: 8,
  },
  infoContainer: {
    margin: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#C80815',
  },
  infoText: {
    fontSize: 14,
    marginBottom: 4,
  },
});

export default Tarifas;
