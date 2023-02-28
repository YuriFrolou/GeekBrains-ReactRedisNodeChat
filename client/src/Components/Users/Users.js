import React, {useState} from 'react';
import styles from "./Users.module.css";
import {NavLink} from "react-router-dom";

const Users = ({contacts, user,currentUser}) => {

    return (
        <div>
            {
                contacts.map((item) => {
                    if (item.email !== user.email) {
                        return (

                            <NavLink to={{pathname: "/messages"}}
                                     state={{email: item.email, name: item.name, lastName: item.lastName,currentUser:currentUser}}
                                     className={styles.userRadio} key={item.email}>
                                <input type="radio" value={`${item.email}`} id={item.email}
                                       data-user={`${item.name} ${item.lastName}`}
                                       className={styles.radio}  name="user"/>
                                <label htmlFor={item.email}
                                       className={styles.userLabel}>{item.name} {item.lastName}</label>
                            </NavLink>)
                    }
                })
            }
        </div>
    );
};

export default Users;