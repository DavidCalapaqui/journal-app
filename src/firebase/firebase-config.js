
import 'firebase/firestore';
import 'firebase/auth';

import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider } from 'firebase/auth';

//console.log('VARIABLES DE ENTORNO: \n', process.env) 

const firebaseConfig = {
  apiKey:           process.env.REACT_APP_APIKEY,
  authDomain:       process.env.REACT_APP_AUTHDOMAIN,
  projectId:        process.env.REACT_APP_PROJECTID,
  storageBucket:    process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId:process.env.REACT_APP_MESSAGINGSENDERID,
  appId:            process.env.REACT_APP_APPID,
  measurementId:    process.env.REACT_APP_MEASUREMENTIDS,
}

/*const firebaseConfig = {
    apiKey:             "AIzaSyC6J8n0OGdyL_K1fWJI86XNbHgXJn-9t30",
    authDomain:         "react-journal-app-1cde8.firebaseapp.com",
    projectId:          "react-journal-app-1cde8",
    storageBucket:      "react-journal-app-1cde8.appspot.com",
    messagingSenderId:  "340633922056",
    appId:              "1:340633922056:web:74873bd7343357a6c1ffbd",
    measurementId:      "G-431HB3RJDH"
  };
*/
/*
const firebaseConfigTesting = {
  apiKey: "AIzaSyC1XS-3Uf96TC_5Kt2Ueis6qHbKAaKzDVE",
  authDomain: "db-journal-test.firebaseapp.com",
  projectId: "db-journal-test",
  storageBucket: "db-journal-test.appspot.com",
  messagingSenderId: "545746818137",
  appId: "1:545746818137:web:8c4130927d8733259e0d48",
  measurementId: "G-D65LB2N903"
};*/


//if(process.env.NODE_ENV === 'test'){
//  //testing
//  //const app = initializeApp(firebaseConfigTesting);
//  initializeApp(firebaseConfigTesting);
//}else{
//  //dev/prod
//  //const app = initializeApp(firebaseConfig);
//  initializeApp(firebaseConfig);
//}
initializeApp(firebaseConfig);



//base de datos
const db = getFirestore();
//poveedor de autenticacion
const googleAuthProvider = new GoogleAuthProvider();

export {
  db, 
  googleAuthProvider,
  
}