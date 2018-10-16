import { initializeApp } from 'firebase';
const app = initializeApp({
  apiKey: "AIzaSyArpaF5cN427SHJ0xD_EuWe_4jQ5pc1uQw",
  authDomain: "testvue-1ab02.firebaseapp.com",
  databaseURL: "https://testvue-1ab02.firebaseio.com",
  projectId: "testvue-1ab02",
  storageBucket: "testvue-1ab02.appspot.com",
  messagingSenderId: "1073208552445"
});

export const db = app.database();
export const info = db.ref('.info');

export const onlineRef = db.ref('online');
export const mobileRef = db.ref('mobileOnline');

export const usersRef = db.ref('users');
export const animeRef = db.ref('anime-published');
export const hiddenAniRef = db.ref('anime-hidden');
export const commentsRef = db.ref('comments');

export const featureRef = db.ref('recommendations');

export const ipRef = db.ref('ip');
export const testAddRef = db.ref('testAdd');
