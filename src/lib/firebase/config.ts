import firebase from "firebase/app";

var firebaseConfig = {
  apiKey: "AIzaSyB1nM54e24m7CYQPfWg2t8yBd3mW_VCugs",
  authDomain: "fast-note-3939b.firebaseapp.com",
  databaseURL: "https://fast-note-3939b-default-rtdb.firebaseio.com",
  projectId: "fast-note-3939b",
  messagingSenderId: "641235894549",
  appId: "1:641235894549:web:786ddc79b74f4b7a5be91c",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
