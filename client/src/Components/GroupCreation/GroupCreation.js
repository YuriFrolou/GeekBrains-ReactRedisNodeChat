import React, {useContext, useState} from 'react';
import styles from "../GroupCreation/GroupCreation.module.css";
import {Context} from "../../index";
import {useAuthState} from "react-firebase-hooks/auth";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {createArrayOfObj} from "../../utils/helpers";
import Popup from "../Popup/Popup";
import firebase from "firebase/compat";


const GroupCreation = () => {
    const {auth, firestore} = useContext(Context);
    const [user] = useAuthState(auth);
    const [users] = useCollectionData(firestore.collection('/users'));
    const [isVisible, setIsVisible] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [titleGroup, setTitleGroup] = useState('');
    const [group, setGroup] = useState(null);


    const arrayOfUsers = createArrayOfObj(users);
    const currentUser = arrayOfUsers.find(i => i.email === user.email);
    const contacts = arrayOfUsers.filter(i => i.email !== user.email);


    const createGroup = async (e) => {
        e.preventDefault();
        const data = Array.from(e.currentTarget.elements).filter(el => (el.checked && el.getAttribute('type') === 'checkbox')).map(el => el.value);
        console.log(data)
        const clients = data.map(i => {
            return {
                ...JSON.parse(i),
                group: titleGroup
            }
        })
        clients.push({
            name:currentUser.name,
            lastName:currentUser.lastName,
            email:currentUser.email,
            group:titleGroup
        })
        console.log(clients)
        if (data.length > 0) {
            setIsSuccess(true);
        }
        setGroup({[titleGroup]: [...clients]})

        await firebase.firestore().collection('/groups').add({...clients})

        setIsVisible(true);
        setTimeout(() => {
            setIsVisible(false);
        }, 1500)
    };

    return (
        <div>
            <form onSubmit={createGroup}>
                {
                    contacts.map((item) => {
                        if (item.email !== user.email) {
                            return (
                                <div className={styles.userCheck} key={item.email}>
                                    <input type="checkbox" value={JSON.stringify({
                                        email: item.email,
                                        name: item.name,
                                        lastName: item.lastName
                                    })} id={item.email}
                                           data-user={`${item.name} ${item.lastName}`}
                                           className={styles.check} name="user"
                                           onChange={(prev) => setIsSuccess(!prev)}/>
                                    <label htmlFor={item.email}
                                           className={styles.userLabel}>{item.name} {item.lastName}</label>
                                </div>
                            )
                        }
                    })
                }
                <input type="text" placeholder="Введите название группы" value={titleGroup} onChange={e => {
                    setTitleGroup(e.target.value)
                }} className={styles.titleGroup} required={true}/>
                <button type="submit" className={styles.createGroupBtn}>Создать группу</button>
            </form>
            <div className={isVisible ? styles.block : styles.hidden}>
                <Popup message={isSuccess ? "Группа создана" : "Необходимо выбрать хотя-бы один контакт"}/>
            </div>

        </div>
    );
};

export default GroupCreation;