import React from 'react';
import { View, Text, Image, TouchableOpacity, Pressable, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Logo from '../assets/Logo-TucuTrack.png'; // Asegúrate de importar tu logo correctamente

const Main = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.logo} />
      <Text style={styles.title}>TucuTrack</Text>
      <View style={styles.menu}>
        <TouchableOpacity style={styles.menuItem}>
          <Link asChild href="/seguimiento">
            <Pressable style={styles.pressable}>
              <Ionicons name="bus" size={24} color="white" />
              <Text style={styles.menuText}>Por donde viene</Text>
            </Pressable>
          </Link>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Link asChild href="/tarifas">
            <Pressable style={styles.pressable}>
              <Ionicons name="logo-usd" size={24} color="white" />
              <Text style={styles.menuText}>Tarifas</Text>
            </Pressable>
          </Link>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Link asChild href="/login">
            <Pressable style={styles.pressable}>
              <Ionicons name="alert-circle" size={24} color="white" />
              <Text style={styles.menuText}>Reportar</Text>
            </Pressable>
          </Link>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Link asChild href="/horarios">
            <Pressable style={styles.pressable}>
              <Ionicons name="time" size={24} color="white" />
              <Text style={styles.menuText}>Horarios</Text>
            </Pressable>
          </Link>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 40,
  },
  menu: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  menuItem: {
    width: "48%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4CAF50",
    borderRadius: 10,
    marginBottom: 15,
    paddingVertical: 10, // Asegura que el área de toque sea adecuada
  },
  pressable: {
    alignItems: "center",
  },
  menuText: {
    color: "white",
    marginTop: 10,
    textAlign: "center",
  },
});

export default Main;
