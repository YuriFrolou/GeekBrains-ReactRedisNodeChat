import React, {useContext, useEffect, useState} from "react";
import {
    BrowserRouter,
    Route,Routes,
    NavLink
} from 'react-router-dom';

import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import Registration from "../Registration/Registration";
import Chat from "../Chat/Chat";
import styles from "./Router.module.css";
import {Context} from "../../index";
import Exit from "../../images/exit.png";
import Messages from "../Messages/Messages";
import Menu from "../../images/menu.svg";
import GroupCreation from "../GroupCreation/GroupCreation";
import Groups from "../Groups/Groups";


function Router() {
const{auth}=useContext(Context);
    const [authed, setAuthed] = useState(false);
    const [isMobile,setIsMobile]=useState(false);
    useEffect(() => {
      auth.onAuthStateChanged((user) => {
            if (user) {
                setAuthed(true);
            } else {
                setAuthed(false);
            }
        })

    }, []);

    const logout = async () => {
        await auth.signOut();
    };
    const getMenu=()=>{
        setIsMobile(prev=>!prev);
    };

    return (
        <BrowserRouter>
            <header className={styles.header}>
                <ul className={styles.headerUl}>
                    <li className={styles.menu}>
                        <button className={styles.menuButton} onClick={getMenu}>
                            <img src={Menu} alt="menu"/>
                        </button>
                    </li>
                    <li className={!isMobile?styles.links:styles.linksMobile} onClick={e=>setIsMobile(false)}>
                        <NavLink to="/">Главная</NavLink>

                        <NavLink to="/profile">Профиль</NavLink>

                        <NavLink to="/chats">Контакты</NavLink>

                        <NavLink to="/groups">Группы</NavLink>
                    </li>
                    <li className={styles.headerLi}>
                        {!authed &&
                        <NavLink to="/registration">Регистрация</NavLink>}
                        {!authed &&
                        <NavLink to="/login">Вход</NavLink>}
                        {authed && <button className="logout-btn" onClick={logout}><img src={Exit} alt="Выход"/></button>}
                    </li>
                </ul>
            </header>


            <Routes>
                <Route exec path="/" element={<h2 className={styles.h2}>Добро пожаловать в тестовый чат</h2>}/>
                <Route path="/chats" element={authed?<Chat/>: <Login/>}/>
                <Route path="/profile" element={authed?<Profile/>: <Login/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/registration" element={<Registration/>}/>
                <Route path="/create" element={<GroupCreation/>}/>
                <Route path="/groups" element={<Groups/>}/>
                <Route path="/messages" element={<Messages/>}/>
                <Route path="*" element={<h2 className={styles.h2}>Страница не найдена</h2>}/>
            </Routes>

        </BrowserRouter>
    )
}

export default Router;