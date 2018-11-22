import { initializeApp } from 'firebase';
const app = initializeApp({
  //apiKey: "",
  //authDomain: "",
  //databaseURL: "",
  //projectId: "",
  //storageBucket: "",
  //messagingSenderId: ""
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
