import { getApp, getApps, initializeApp } from "firebase/app";

// Web config is public by design; access is enforced by Firebase security rules.
export const firebaseConfig = {
  apiKey: "AIzaSyCDHbt6cXNv0nJ1toPig8nGt2IF3o4FBlg",
  authDomain: "la-viuda-ec1be.firebaseapp.com",
  projectId: "la-viuda-ec1be",
  storageBucket: "la-viuda-ec1be.firebasestorage.app",
  messagingSenderId: "48821628287",
  appId: "1:48821628287:web:3b5f0e778c1ab443983e4a",
};

export const firebaseApp = getApps().length
  ? getApp()
  : initializeApp(firebaseConfig);
