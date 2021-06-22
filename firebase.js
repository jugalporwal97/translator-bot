import firebase from "firebase"
const firebaseConfig = {
    apiKey: "AIzaSyCSyXvwwX_SjzYR6Sn4iJuZyJd5B2dTMso",
    authDomain: "translation-app-react-next-js.firebaseapp.com",
    projectId: "translation-app-react-next-js",
    storageBucket: "translation-app-react-next-js.appspot.com",
    messagingSenderId: "901660662781",
    appId: "1:901660662781:web:e199aa7d399bcad97b9794"
  };
let app;
if(!firebase.apps.length){
  app = firebase.initializeApp(firebaseConfig);
}
else{
  app = firebase.app();
}


  const db = app.firestore();
  export {db}