// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {getAuth,signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { getFirestore,doc,getDoc} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

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
  measurementId: "G-4KLNWS1YPR",
  databaseURL: `https://pruebasproyecto5.firebaseio.com`,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();

let MainForm = document.getElementById("MainForm");
let user = document.getElementById("username");
let pass = document.getElementById("password");
let mail = document.getElementById("email");

let SignInUser = evt =>{
    evt.preventDefault();
    
    signInWithEmailAndPassword(auth,mail.value,pass.value).then(async (credentials) =>{
        var ref = doc(db,"UserAuthList",credentials.user.uid);
        const docSnap = await getDoc(ref);
      
        if(docSnap.exists){
            sessionStorage.setItem("user-info",JSON.stringify({
                mail: docSnap.data().mail,
                firstname: docSnap.data().firstname,
                password: docSnap.data().password,
                role: docSnap.data().role
            }))
            sessionStorage.setItem("user-creds",JSON.stringify(credentials.user));
            
            var roleUser = JSON.parse(sessionStorage.getItem("user-info"));
            if(roleUser.role == "Usuario"){
                alert("Iniciaste como usuario")
                window.location.href = "Ranking";
            }else if(roleUser.role == "Administrador"){
                alert("Iniciaste como administrador")
                window.location.href = "home";
            }else{
                alert("no tiene permisos")
            }
        }

    }).catch((error)=>{
        alert("Inicio de sesion erroneo");
    })
    }
    

MainForm.addEventListener("submit",SignInUser);
