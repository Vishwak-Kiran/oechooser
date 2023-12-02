import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyC_yW9OtEQcLzGJFfzE72xndM1hGpaRxN8",
  authDomain: "open-elective-7d9bd.firebaseapp.com",
  projectId: "open-elective-7d9bd",
  storageBucket: "open-elective-7d9bd.appspot.com",
  messagingSenderId: "943886016094",
  appId: "1:943886016094:web:b4ea0b5df2235016fa5ecf",
  measurementId: "G-R01K0CNBHZ"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics(); 

const fireStore = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const timestamp = firebase.firestore.Timestamp;

export { fireStore, auth, timestamp, storage };
