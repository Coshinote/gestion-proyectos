// src/firebase.js
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/functions';

const firebaseConfig = {
  apiKey: "AIzaSyBWIJbcfTDmXZjmr2vrlY_a0T1NlVgxv-E",
  authDomain: "gestion-proyectos-9899b.firebaseapp.com",
  projectId: "gestion-proyectos-9899b",
  storageBucket: "gestion-proyectos-9899b.firebasestorage.app",
  messagingSenderId: "764321202420",
  appId: "1:764321202420:web:982829aaaa27e6bc7a9ea1",
  measurementId: "G-SWE8F8ZPSX"
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const functions = firebase.functions();

// ✅ CONFIGURAR EMULADOR
if (window.location.hostname === 'localhost') {
  console.log('🔥 Usando Firebase Emulator Suite - Modo DESARROLLO');
  
  db.useEmulator('localhost', 8080);
  
  // ✅ IMPORTANTE: Especificar región explícitamente
  functions.useEmulator('localhost', 5001);
}

export default firebase;