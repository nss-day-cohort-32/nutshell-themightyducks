import firebase from 'firebase';

const config = { /* COPY THE ACTUAL CONFIG FROM FIREBASE CONSOLE */
    apiKey: "AIzaSyC9T6Gx8suFKT0QZNge4IHr2Lo0nFT48f4",
    authDomain: "nutshell-11208.firebaseapp.com",
    databaseURL: "https://nutshell-11208.firebaseio.com",
    projectId: "nutshell-11208",
    storageBucket: "nutshell-11208.appspot.com",
    messagingSenderId: "441313643816",
    appId: "1:441313643816:web:5a3dfc5cc087bf8c"
};
const fire = firebase.initializeApp(config);
export default fire;