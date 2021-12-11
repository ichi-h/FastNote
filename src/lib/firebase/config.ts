import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDnpcZOBLXfyHz7KfkAuKfnnyU97T6mD8s",
  authDomain: "fast-note-ee105.firebaseapp.com",
  projectId: "fast-note-ee105",
  storageBucket: "fast-note-ee105.appspot.com",
  messagingSenderId: "315841084786",
  appId: "1:315841084786:web:de5f48bcc590a82c05f1eb"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
