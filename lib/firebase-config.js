import firebase from 'firebase';

const config = {
	apiKey: "AIzaSyAaDo5HRY0tpjfQas7PjOZXXyobtvip3F4",
    authDomain: "project-sherpa-d3a40.firebaseapp.com",
    databaseURL: "https://project-sherpa-d3a40.firebaseio.com",
    projectId: "project-sherpa-d3a40",
    storageBucket: "project-sherpa-d3a40.appspot.com",
    messagingSenderId: "87489297064",
    appId: "1:87489297064:web:c7d0c72df2893fb8"
};

firebase.initializeApp(config);

export const ref = firebase.database().ref();
export const firebaseAuth = firebase.auth;