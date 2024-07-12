import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCoDDJZiKpgobRxdK6K6RhGfK3P5M1RY0w",
    authDomain: "mymoney-8d010.firebaseapp.com",
    projectId: "mymoney-8d010",
    storageBucket: "mymoney-8d010.appspot.com",
    messagingSenderId: "388346229047",
    appId: "1:388346229047:web:c1718d2ef5f2b3b5f66ab2"
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init service
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();

// function to create timestamps
const timestamp = firebase.firestore.Timestamp;

export { projectFirestore, projectAuth, timestamp };