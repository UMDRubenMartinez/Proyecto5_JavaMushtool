//importa las collections y todo lo necesario para poder leer de la bbdd
import { getFirestore, collection, getDocs,query, orderBy } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

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
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// crear funciones para interactuar con la bbdd y exportarlas


// ranking
export const getScores = async (orderByField, orderDirection) => {
    const scoresCol = collection(db, 'scores');
    const q = query(scoresCol, orderBy(orderByField, orderDirection));
    const scoreSnapshot = await getDocs(q);
    const scoreList = scoreSnapshot.docs.map(doc => {
        let data = doc.data();
        data.createdAt = new Date(data.createdAt.seconds * 1000); // Convierte Timestamp a Date
        return data;
    });
    return scoreList;
};