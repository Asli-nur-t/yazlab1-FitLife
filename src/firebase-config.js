// Import the functions you need from the SDKs you need

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import {getApp} from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyDFDnTu2RLy4rpr_G1knSbfN4bvadOvo0s",
    authDomain: "fitlife-c35a7.firebaseapp.com",
    databaseURL: "https://fitlife-c35a7-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "fitlife-c35a7",
    storageBucket: "fitlife-c35a7.appspot.com",
    messagingSenderId: "290265174459",
    appId: "1:290265174459:web:ef685f864dd7c1b187349e",
    measurementId: "G-42G1QWFNCV"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, auth, firestore, storage };

