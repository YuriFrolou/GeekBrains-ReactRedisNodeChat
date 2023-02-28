import React, {createContext, useContext} from "react";
import './App.css';
import Chat from "./Components/Chat/Chat";
import Users from "./Components/Users/Users";
import Router from "./Components/Router/Router";
import {Context} from "./index";
import {useAuthState} from "react-firebase-hooks/auth";
import Loader from "./Components/Loader/Loader";




function App() {
    const{auth}=useContext(Context);
    const [user,loading,error]=useAuthState(auth);
    if(loading){
        return <Loader/>
    }
  return (
    <div className="App">
     <Router/>
    </div>
  );
}

export default App;
