// archivo que interactuca con la bbdd de firestone

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-analytics.js";
//importa las collections y todo lo necesario para poder leer de la bbdd
import { getFirestore, collection, getDocs,query, orderBy,deleteDoc,doc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

// credenciales de firebase

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCf65uvjvik2zC_6S4ZinGqwZQbBe7VxfU",
    authDomain: "mushroomfb-44f56.firebaseapp.com",
    projectId: "mushroomfb-44f56",
    storageBucket: "mushroomfb-44f56.appspot.com",
    messagingSenderId: "179940524719",
    appId: "1:179940524719:web:25898fdae7936570a34a5a",
    measurementId: "G-0EFS26K3PT"
};

// Initialize Firebase
const app2 = initializeApp(firebaseConfig);
const analytics = getAnalytics(app2);
const db2 = getFirestore(app2);

// crear funciones para interactuar con la bbdd y exportarlas


// ranking
export const getScores = async (orderByField, orderDirection) => {
    const scoresCol = collection(db2, 'scores');
    const q = query(scoresCol, orderBy(orderByField, orderDirection));
    const scoreSnapshot = await getDocs(q);
    const scoreList = scoreSnapshot.docs.map(doc => {
        let data = doc.data();
        data.createdAt = new Date(data.createdAt.seconds * 1000); // Convierte Timestamp a Date
        return data;
    });
    return scoreList;
};

// mushrooms
export const getMushrooms = async () => {
    const mushroomsCol = collection(db2, 'mushrooms');
    const mushroomsSnapshot = await getDocs(mushroomsCol);
    const mushroomsList = mushroomsSnapshot.docs.map(doc => {
        let data = doc.data();
        data.id = doc.id;
        return data;
    });
    return mushroomsList;    
};
// agregar seta
export const addMushroom = async (mushroomData) => {
    try {
        const mushroomsCol = collection(db2, 'mushrooms');
        await addDoc(mushroomsCol, mushroomData);
        console.log("Hongo agregado con éxito.");
    } catch (error) {
        console.error("Error al agregar el hongo:", error);
    }
};
// delete seta
export const deleteMushroom = async (mushroomId) => {
    try {
        const mushroomsCol = collection(db2, 'mushrooms');
        await deleteDoc(doc(mushroomsCol, mushroomId));
        console.log("Hongo eliminado con éxito.");
    } catch (error) {
        console.error("Error al eliminar el hongo:", error);
    }
};
// actualizar
export const updateMushroom = async (mushroomId, updatedData) => {
    try {
        const mushroomsCol = collection(db2, 'mushrooms');
        await updateDoc(doc(mushroomsCol, mushroomId), updatedData);
        console.log("Hongo actualizado con éxito.");
    } catch (error) {
        console.error("Error al actualizar el hongo:", error);
    }
};

