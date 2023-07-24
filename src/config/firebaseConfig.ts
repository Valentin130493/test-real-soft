import {initializeApp} from "firebase/app";
import {initializeFirestore} from 'firebase/firestore';
import {collection, getDocs, setDoc, doc} from "firebase/firestore";
import {CardInterface} from "../types";


const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = initializeFirestore(app, {
    experimentalForceLongPolling: true,
});

export const firebaseGetCards = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "cards"));
        let data: any = []
        querySnapshot.forEach(doc => {
            data.push(doc.data())
        })
        return data

    } catch (error) {
        console.error(error);
    }
}


export const firebaseAddCard = async (data: any) => {
    await setDoc(doc(db, "cards", `${data.title}`), {
        ...data
    });
}

export const firebaseUpdateMarkers = async (card: CardInterface | null, markers: any) => {
    await setDoc(doc(db, "cards", `${card?.title}`), {
        ...card,
        markers: markers
    });
}







