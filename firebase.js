import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCtmKW_1kzmOHlvv24j_7XqGFf3jqAYmx0",
  authDomain: "chainnes.firebaseapp.com",
  projectId: "chainnes",
  storageBucket: "chainnes.appspot.com",
  messagingSenderId: "886289861101",
  appId: "1:886289861101:web:od6b4003bddb9f9493ffe4",
  measurementId: "G-STQ19X42SR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };