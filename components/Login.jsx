import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Image, Pressable } from "react-native";
import { Link, useRouter } from "expo-router";
import Logo from "../assets/Logo-TucuTrack.png";
import * as Google from 'expo-auth-session/providers/google';
import { firebase } from "../firebase";
import { getAuth, signInWithEmailAndPassword, signInWithCredential, GoogleAuthProvider } from 'firebase/auth';
import { Ionicons } from '@expo/vector-icons';

const Login = ({ navigation }) => {
  const router = useRouter();
  const auth = getAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: "336066728031-8g96ap9pgsueeb34sam0lcmqn1ff06gj.apps.googleusercontent.com",
    scopes: ['profile', 'email']
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then((userCredential) => {
          // Inicio de sesión exitoso con Google
          console.log("Usuario autenticado con Google:", userCredential.user);
          router.push("/");
        })
        .catch((error) => {
          console.log("Error de autenticación con Google:", error);
          alert(error.message);
        });
    }
  }, [response]);

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Inicio de sesión exitoso
        console.log("Usuario autenticado:", userCredential.user);
        router.push("/");
      })
      .catch((error) => {
        console.log("Error de inicio de sesión:", error);
        alert(error.message);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Link href="/" asChild>
          <Pressable>
            <Image source={Logo} style={styles.logo} />
          </Pressable>
        </Link>
        <Text style={styles.title}>¡Bienvenidos a TucuTrack!</Text>
      </View>
      <TextInput 
        style={styles.input} 
        placeholder="Usuario"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.inputWithIcon}
          placeholder="Contraseña"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <Pressable onPress={() => setShowPassword(!showPassword)}>
          <Ionicons
            name={showPassword ? 'eye-off' : 'eye'}
            size={24}
            color="grey"
            style={styles.eyeIcon}
          />
        </Pressable>
      </View>
      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Ingresar</Text>
      </Pressable>
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
        <Link href="/registrarse" style={styles.registerLink}>
          Regístrate
        </Link>
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
    alignSelf: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 60,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '90%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
  },
  passwordContainer: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
    paddingRight: 10, // Espacio para el icono
  },
  inputWithIcon: {
    flex: 1,  // Ocupa todo el espacio disponible
    padding: 10,
    borderRadius: 5,
  },
  eyeIcon: {
    marginLeft: -30, // Alinea el icono dentro del cuadro
  },
  button: {
    backgroundColor: '#4285F4',
    padding: 10,
    borderRadius: 5,
    paddingHorizontal: 30,
    marginTop: 10,
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 16
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
    marginTop: 10,
    fontSize: 16,
  },
  registerLink: {
    color: "blue",
    textDecorationLine: 'underline',
  },
});

export default Login;
