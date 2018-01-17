import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

firebase.initializeApp({
    apiKey: "AIzaSyAIfB5JDqbr5_14oJAJh5IOap6PBemiu0A",
    authDomain: "papeleria-sucre.firebaseapp.com",
    databaseURL: "https://papeleria-sucre.firebaseio.com",
    projectId: "papeleria-sucre",
    storageBucket: "papeleria-sucre.appspot.com",
    messagingSenderId: "1075654820216"
});


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
