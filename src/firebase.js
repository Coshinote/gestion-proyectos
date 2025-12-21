// src/firebase.js
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/functions';

// PEGA AQUÍ tu configuración de Firebase que copiaste en el Paso 5
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBWIJbcfTDmXZjmr2vrlY_a0T1NlVgxv-E",
  authDomain: "gestion-proyectos-9899b.firebaseapp.com",
  projectId: "gestion-proyectos-9899b",
  storageBucket: "gestion-proyectos-9899b.firebasestorage.app",
  messagingSenderId: "764321202420",
  appId: "1:764321202420:web:982829aaaa27e6bc7a9ea1",
  measurementId: "G-SWE8F8ZPSX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

// Exportar servicios para usarlos en otros archivos
export const db = firebase.firestore();
export const functions = firebase.functions();
export default firebase;