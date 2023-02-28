import React, {useState, useRef, useContext} from 'react';
import {Context} from "../../index";
import {useAuthState} from "react-firebase-hooks/auth";
import {useCollectionData} from "react-firebase-hooks/firestore";
import styles from "./Chat.module.css";
import Users from "../Users/Users";
import {createArrayOfObj} from "../../utils/helpers";
import GroupCreation from "../GroupCreation/GroupCreation";
import {NavLink} from "react-router-dom";

const Chat = () => {
    const {auth, firestore} = useContext(Context);
    const [user] = useAuthState(auth);
    const [users] = useCollectionData(firestore.collection('/users'));

    const arrayOfUsers=createArrayOfObj(users);
    const currentUser=arrayOfUsers.find(i=>i.email===user.email);
    const contacts=arrayOfUsers.filter(i=>i.email!==user.email);



    return (
        <div className={styles.chat}>
            <div className={styles.users}>
                <Users contacts={contacts}  user={user} currentUser={currentUser}/>
                <NavLink to={{pathname: "/create"}} className={styles.addGroupBtn} title="Создать группу">+</NavLink>
            </div>
        </div>
    );
};

export default Chat;