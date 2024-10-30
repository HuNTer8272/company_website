import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDDqJRAsdx1-B7JZPCdoKilCls9pPB6Pho",
    authDomain: "ecommerce-391216.firebaseapp.com",
    projectId: "ecommerce-391216",
    storageBucket: "ecommerce-391216.appspot.com",
    messagingSenderId: "169081823951",
    appId: "1:169081823951:web:044f9c3f96d016f5a94dba",
    measurementId: "G-PPN7PRDRDX"
}

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();

export {auth,firestore,storage};