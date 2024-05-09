// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {getAuth,createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { getFirestore,doc,setDoc} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDI1xmMkeQgK0M6da__SOi_rL-2yAka8xQ",
  authDomain: "pruebasproyecto5.firebaseapp.com",
  projectId: "pruebasproyecto5",
  storageBucket: "pruebasproyecto5.appspot.com",
  messagingSenderId: "556780404775",
  appId: "1:556780404775:web:1882ee4000c428465b0e02",
  measurementId: "G-4KLNWS1YPR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();
let MainForm = document.getElementById("MainForm");
let user = document.getElementById("username");
let pass = document.getElementById("password");
let mail = document.getElementById("email");

let RegisterUser = async evt =>{
evt.preventDefault();

await createUserWithEmailAndPassword(auth,mail.value,pass.value).then(async (credentials) =>{
  var ref = doc(db,"UserAuthList",credentials.user.uid);
  await setDoc(ref, {
    mail: mail.value,
    firstname: user.value,
    password: pass.value,
    role: "Usuario"
  })
})
alert("Registro Correcto")
window.location.href = "login";
}


MainForm.addEventListener("submit",RegisterUser);
