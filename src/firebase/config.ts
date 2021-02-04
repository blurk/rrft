import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyCBNMeYZfw-jE3azPcZznawQaYj9rGLoos',
	authDomain: 'react-crud-b6a9f.firebaseapp.com',
	projectId: 'react-crud-b6a9f',
	storageBucket: 'react-crud-b6a9f.appspot.com',
	messagingSenderId: '428691840902',
	appId: '1:428691840902:web:f62a390384a17141c7d607',
	measurementId: 'G-B3ZL6D05LX',
	timestampsInSnapshots: true
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
