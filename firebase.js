// firebase.js
import { initializeApp, getApps } from 'firebase/app';
import { initializeAuth, getAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyDAIGclP5mdwuALb6bpPDWkEEa9HL_QKuc",
  authDomain: "tucutrack-7191e.firebaseapp.com",
  projectId: "tucutrack-7191e",
  storageBucket: "tucutrack-7191e.appspot.com",
  messagingSenderId: "252731756238",
  appId: "1:252731756238:web:ba9fe4c652a21467f6ca9f"
};

let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

const db = getFirestore(app);

export { app, auth, db };
