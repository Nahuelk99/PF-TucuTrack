import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Image, Pressable } from "react-native";
import { Link, useRouter } from "expo-router";
import Logo from "../assets/Logo-TucuTrack.png";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'; // Importa correctamente desde 'firebase/auth'
import { Ionicons } from '@expo/vector-icons';

const Registrarse = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const auth = getAuth(); // Inicializa auth aquí

  const handleRegister = () => {
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Registro exitoso
        console.log("Usuario registrado:", userCredential.user);
        router.push("/login");
      })
      .catch((error) => {
        console.log("Error de registro:", error);
        alert(error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.logo} />
      <Text style={styles.title}>Registro TucuTrack</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Correo electrónico"
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
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.inputWithIcon}
          placeholder="Confirmar contraseña"
          secureTextEntry={!showConfirmPassword}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <Pressable onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
          <Ionicons
            name={showConfirmPassword ? 'eye-off' : 'eye'}
            size={24}
            color="grey"
            style={styles.eyeIcon}
          />
        </Pressable>
      </View>
      <Pressable style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </Pressable>
      <Text style={styles.login}>
        ¿Ya tienes una cuenta?{' '}
        <Link href="/login" style={styles.loginLink}>
          Inicia sesión
        </Link>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#333',
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
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  login: {
    marginTop: 20,
    fontSize: 16,
    color: '#333',
  },
  loginLink: {
    color: '#007BFF',
    fontWeight: 'bold',
  },
});

export default Registrarse;
