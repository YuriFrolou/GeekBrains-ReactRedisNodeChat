import React, {useContext, useEffect, useState} from "react";
import firebase, {onLog} from "firebase/compat";
import {Context} from "../../index";
import {useAuthState} from "react-firebase-hooks/auth";
import {useCollectionData} from "react-firebase-hooks/firestore";


const Profile = () => {

    const {auth, firestore} = useContext(Context);
    const [user] = useAuthState(auth);
    const [users] = useCollectionData(firestore.collection('/users'));

    const findCurrentUser = () => {
        const arr = [];
        for (const i in users) {
            arr.push(users[i])
        }
        return arr;
    };


    return (
        <div className="profile">

            <h2>Профиль</h2>

            <span className="profile-user-title-data">Ваши данные</span>

            {
                findCurrentUser().map((item) => {
                    if (item.email === user.email) {
                        return (
                            <div className="profile-user-data" key={item.email}>
                                <p><strong>Имя:</strong> {item.name}</p>
                                <p><strong>Фамилия:</strong> {item.lastName} </p>
                            </div>)
                    }
                })
            }


        </div>
    );
};

export default Profile;











