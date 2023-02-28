import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../index";
import {useAuthState} from "react-firebase-hooks/auth";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {createArrayOfObj} from "../../utils/helpers";
import {NavLink} from "react-router-dom";
import styles from "../Groups/Groups.module.css";


const Groups = () => {
    const {auth, firestore} = useContext(Context);
    const [user] = useAuthState(auth);
    const [groups] = useCollectionData(firestore.collection('/groups'));
    const [users] = useCollectionData(firestore.collection('/users'));
    const arrayOfUsers=createArrayOfObj(users);
    const currentUser=arrayOfUsers.find(i=>i.email===user.email);

    const arrayOfGroups = createArrayOfObj(groups);
    const groupsOfUser=[];
    arrayOfGroups.forEach(item1=>{
        const arr=createArrayOfObj(item1);
        arr.forEach(i=>{
            if(i.email===currentUser.email){
                groupsOfUser.push(item1)
            }
        })
    })

    return (
        <div className={styles.groups}>
            {
                groupsOfUser.map((item) => {

                    return (

                        <NavLink to={{pathname: "/messages"}}
                             state={{currentUser:currentUser,group:item[0].group}}
                                 className={styles.userRadio} key={item[0].group}>
                            <input type="radio" value={`${item[0].group}`} id={item[0].group}
                                   className={styles.radio} name="user"/>
                            <label htmlFor={item[0].group}
                                   className={styles.userLabel}>{item[0].group}</label>

                        </NavLink>)

                })
            }
        </div>
    );
};

export default Groups;