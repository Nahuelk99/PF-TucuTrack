import React, { useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Image, Pressable } from "react-native";
import Logo from "../assets/Logo-TucuTrack.png";
import * as Google from 'expo-auth-session/providers/google';
import { firebase } from "../firebase";
import { Ionicons } from '@expo/vector-icons';

const Login = ({ navigation }) => {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: "252731756238-3it4sq952fi4g2e98k64l0hhg2dcoob9.apps.googleusercontent.com",
    scopes: ['profile', 'email']
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = firebase.auth.GoogleAuthProvider.credential(id_token);
      firebase.auth().signInWithCredential(credential).catch(error => {
        console.log(error);
      });
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.logo} />
      <Text style={styles.title}>TucuTrack</Text>
      <TextInput style={styles.input} placeholder="Usuario" />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
      />
      <Button title="Ingresar" onPress={() => navigation.navigate("Main")} />
      <Text>{'\n'}
        o
      </Text>
      <Pressable 
        style={styles.googleButton}
        disabled={!request}
        onPress={() => promptAsync()}
      >
        <Ionicons name="logo-google" size={24} color="white" />
        <Text style={styles.googleButtonText}>Continuar con Google</Text>
      </Pressable>
      <Text style={styles.register}>
        ¿No tienes cuenta?{' '}
        <Text
          style={styles.registerLink}
          onPress={() => alert("Funcionalidad de registro próximamente")}
        >
          Regístrate
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
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
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 25,
    paddingHorizontal: 10,
  },
  googleButton: {
    marginTop: 15,
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 25,
    backgroundColor: '#4285F4',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  googleButtonText: {
    color: '#fff',
    marginLeft: 10,
  },
  register: {
    marginTop: 20,
    fontSize: 16,
  },
  registerLink: {
    color: "blue",
    textDecorationLine: 'underline',
  },
});

export default Login;
