import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from "firebase/compat";
import firebaseConfig from "./services/firebase";

export const Context=createContext(null);
firebase.initializeApp(firebaseConfig);
const auth=firebase.auth();
const firestore=firebase.firestore();


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Context.Provider value={{firebase,auth,firestore}}>
    <App />
    </Context.Provider>
);

reportWebVitals();
