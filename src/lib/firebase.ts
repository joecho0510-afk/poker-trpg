import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBi_Eev_DMzfgD7hUTX8b-oCt2o4gIUfby",
  authDomain: "trpg-poker-room.firebaseapp.com",
  projectId: "trpg-poker-room",
  storageBucket: "trpg-poker-room.firebasestorage.app",
  messagingSenderId: "579713331817",
  appId: "1:579713331817:web:c456e6b817660351e6e8f8",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);