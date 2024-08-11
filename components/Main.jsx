import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Pressable, StyleSheet, Alert } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Logo from '../assets/Logo-TucuTrack.png';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';

const Main = () => {
  const [user, setUser] = useState(null);
  const auth = getAuth();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    signOut(auth).then(() => {
      router.replace('/login');
    }).catch((error) => {
      console.error('Error al cerrar sesión:', error);
    });
  };

  const handleChatPress = () => {
    if (user) {
      router.push('/chat');
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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {user && (
          <>
            <View style={styles.profileContainer}>
              <Link href="/perfil">
                <Ionicons name="person-circle-outline" size={45} color="black" />
              </Link>
              <Text style={styles.welcomeText}>{user.email}</Text>
            </View>
            <TouchableOpacity onPress={handleSignOut} style={styles.signOutButton}>
              <Ionicons name="log-out-outline" size={28} color="black" />
            </TouchableOpacity>
          </>
        )}
      </View>
      <View style={styles.logoContainer}>
        <Image source={Logo} style={styles.logo} />
        <Text style={styles.title}>TucuTrack</Text>
      </View>
      <View style={styles.menu}>
        <TouchableOpacity style={styles.menuItem}>
          <Link href="/seguimiento" asChild>
            <Pressable style={styles.pressable}>
              <Ionicons name="bus" size={24} color="white" />
              <Text style={styles.menuText}>Por donde viene</Text>
            </Pressable>
          </Link>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Link href="/tarifas" asChild>
            <Pressable style={styles.pressable}>
              <Ionicons name="logo-usd" size={24} color="white" />
              <Text style={styles.menuText}>Tarifas</Text>
            </Pressable>
          </Link>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={handleChatPress}>
          <Pressable style={styles.pressable}>
            <Ionicons name="chatbox-ellipses-sharp" size={24} color="white" />
            <Text style={styles.menuText}>Chat</Text>
          </Pressable>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Link href="/horarios" asChild>
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
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 60,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 16,
    marginLeft: 5,
  },
  signOutButton: {
    padding: 5,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  menu: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  menuItem: {
    width: "45%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4CAF50",
    borderRadius: 10,
    marginBottom: 30,
    paddingVertical: 25,
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