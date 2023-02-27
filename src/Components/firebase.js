import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBpZ5dHGw7_0cyJe7M433tEIIJI1oodsK4",
    authDomain: "drive-new-27fd1.firebaseapp.com",
    projectId: "drive-new-27fd1",
    storageBucket: "drive-new-27fd1.appspot.com",
    messagingSenderId: "286260654649",
    appId: "1:286260654649:web:241a8d16cfdba57bae13e8"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const storage = firebase.storage();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, storage, auth, provider };