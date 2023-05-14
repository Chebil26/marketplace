// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-analytics.js';
import { getStorage } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-storage.js';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDjfMuxFkx3xt0buGp-nHHBtljQL6bSisU',
  authDomain: 'adeemdz.firebaseapp.com',
  //   databaseURL: 'https://your-db-url.firebaseio.com',
  projectId: 'adeemdz',
  storageBucket: 'adeemdz.appspot.com',
  messagingSenderId: '465235454846',
  appId: '1:465235454846:web:2b50c8df01c57a6907a12f',
  measurementId: 'G-41QK29NDKY',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);
