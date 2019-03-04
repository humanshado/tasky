import firebase from 'firebase/app';
import 'firebase/auth';
require('firebase/firestore');

const config = {
    apiKey: "AIzaSyDqXM7GwjKNmg_pk-T7yyEfzrLhU2Xtgno",
    authDomain: "tasky-21914.firebaseapp.com",
    databaseURL: "https://tasky-21914.firebaseio.com",
    projectId: "tasky-21914",
    storageBucket: "tasky-21914.appspot.com",
    messagingSenderId: "305845771535"
};

firebase.initializeApp(config);
const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });

const auth = firebase.auth();

export {
    db,
    auth,
};