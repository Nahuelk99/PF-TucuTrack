import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyCefo0V4QhIoIgjKma3sTljuS_c6rkZYns",
  authDomain: "pf-tucutrack-ce518.firebaseapp.com",
  projectId: "pf-tucutrack-ce518",
  storageBucket: "pf-tucutrack-ce518.appspot.com",
  messagingSenderId: "336066728031",
  appId: "1:336066728031:web:43e04cf14eb711adeecbea"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa la autenticación con persistencia en AsyncStorage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export { auth };
