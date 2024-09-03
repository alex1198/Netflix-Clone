import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyCHrl4J0YeBzzCoPJNM-XpNVMBm0e3dzmQ",
  authDomain: "netflix-clone-cc73a.firebaseapp.com",
  projectId: "netflix-clone-cc73a",
  storageBucket: "netflix-clone-cc73a.appspot.com",
  messagingSenderId: "907502690614",
  appId: "1:907502690614:web:42e92f2dc11926dbd91397"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user; 
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name, 
            authProvider: "local",
            email,
        });
    }
    catch (error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(' '));
        

    }
}

const login = async (email, password) => {
    // login logic here
    try {
        await signInWithEmailAndPassword(auth, email, password);
    }
    catch (error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(' '));
    }
}

const logout =  () => {
    signOut(auth);
}

export {auth, db, login, signup, logout};