import { getApp, getApps, initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCtCcBL8cDzJplPJsUmPG2vUV9ItAUTuuE",
  authDomain: "expensecalc-da4f7.firebaseapp.com",
  projectId: "expensecalc-da4f7",
  storageBucket: "expensecalc-da4f7.appspot.com",
  messagingSenderId: "535306174007",
  appId: "1:535306174007:web:11552f1f3ea8c5989109b2",
  measurementId: "G-4FN31FHSVF",
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage };
