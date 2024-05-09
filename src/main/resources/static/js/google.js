// Import the functions you need from the SDKs you need
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth,GoogleAuthProvider,signInWithPopup,signOut,onAuthStateChanged} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js"
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDI1xmMkeQgK0M6da__SOi_rL-2yAka8xQ",
  authDomain: "pruebasproyecto5.firebaseapp.com",
  databaseURL: "https://pruebasproyecto5-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "pruebasproyecto5",
  storageBucket: "pruebasproyecto5.appspot.com",
  messagingSenderId: "556780404775",
  appId: "1:556780404775:web:1882ee4000c428465b0e02",
  measurementId: "G-4KLNWS1YPR"
};

// Initialize Firebase
const auth = getAuth();

const provider = new GoogleAuthProvider();
const signinButton = document.getElementById("googleLogin");

const userSignIn = async() =>{
    signInWithPopup(auth,provider)
    .then((result) =>{
        const user = result.user
        sessionStorage.setItem("user-creds",JSON.stringify(user));
        window.location.href = "home.html";
        console.log(user);
    })
}

const userSignOut = async() =>{
    signOut(auth)
    .then(() =>{
        alert("Sesion Cerrada");
    })
}

/*onAuthStateChanged(auth,(user) =>{
    if(user){
       alert("Has iniciado sesion")
    }
    else{
        alert("Has cerrado sesion")
    }
})*/

signinButton.addEventListener("click",userSignIn);