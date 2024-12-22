// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const EXPO_FIREBASE_API_KEY = process.env.EXPO_PUBLIC_FIREBASE_API_KEY;
const EXPO_FIREBASE_AUTH_DOMAIN = process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN;
const EXPO_FIREBASE_PROJECT_ID = process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID;
const EXPO_FIREBASE_STORAGE_BUCKET =
  process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET;
const EXPO_FIREBASE_MESSAGING_SENDER_ID =
  process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID;
const EXPO_FIREBASE_APP_ID = process.env.EXPO_PUBLIC_FIREBASE_APP_ID;
const EXPO_FIREBASE_MEASUREMENT_ID =
  process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID;

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: EXPO_FIREBASE_API_KEY,
  authDomain: EXPO_FIREBASE_AUTH_DOMAIN,
  projectId: EXPO_FIREBASE_PROJECT_ID,
  storageBucket: EXPO_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: EXPO_FIREBASE_MESSAGING_SENDER_ID,
  appId: EXPO_FIREBASE_APP_ID,
  measurementId: EXPO_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
const storage = getStorage(app);
const db = getFirestore(app);
export { auth, db, storage };
