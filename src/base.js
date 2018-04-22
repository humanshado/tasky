import Rebase from 're-base';
import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyDqXM7GwjKNmg_pk-T7yyEfzrLhU2Xtgno",
    authDomain: "tasky-21914.firebaseapp.com",
    databaseURL: "https://tasky-21914.firebaseio.com",
    projectId: "tasky-21914",
    storageBucket: "tasky-21914.appspot.com",
    messagingSenderId: "305845771535"
};

const app = firebase.initializeApp(config);
const base = Rebase.createClass(app.database());

export { app };
export default base;