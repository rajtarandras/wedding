// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
	apiKey: "AIzaSyAQYfZ9y6zASfgvcp1BRMBWsPbL4A8hVzg",

	authDomain: "vikiandris-4e10e.firebaseapp.com",

	projectId: "vikiandris-4e10e",

	storageBucket: "vikiandris-4e10e.appspot.com",

	messagingSenderId: "161567885065",

	appId: "1:161567885065:web:ebe74a6a0a659eb183b5d8",

	measurementId: "G-SL85W0TRZS",
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
