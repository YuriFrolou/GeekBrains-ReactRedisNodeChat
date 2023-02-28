import React, {useEffect, useRef, useState} from 'react';
import styles from "./Messages.module.css";
import Send from "../../images/send.svg";
import {useLocation} from "react-router-dom";
import {createArrayOfRedisData} from "../../utils/helpers";

const Messages = () => {
    const location = useLocation();
    const {state} = location;
    const [messages, setMessages] = useState([]);
    const [value, setValue] = useState('');
    const socket = useRef();

    useEffect(() => {
        socket.current = new WebSocket('ws://localhost:5000');
        socket.current.onopen = () => {
            const message = {
                event: "connection",
                username: `${state.currentUser.name} ${state.currentUser.lastName}`,
                userEmail:`${state.currentUser.email}`,
                time: Date.now(),
                channel: state.email?`${state.currentUser.email}:${state.email}`:state.group,
            };
            console.log(`${state.currentUser.name} ${state.currentUser.lastName} connecting to ${state.name? state.name:state.group}`);
            socket.current.send(JSON.stringify(message));
        };
        socket.current.onmessage = (event) => {
            console.log(event.data)
            const message = JSON.parse(event.data);
            if (message.flag === "connection") {
                const arr = createArrayOfRedisData(message.data);
                console.log(message.data)
                console.log(arr)
                setMessages(arr);
                console.log(messages)
            } else {
                setMessages(prev => [...prev, JSON.parse(message.data)]);
            }

        };
        socket.current.onclose = () => {
        };
        socket.current.onerror = () => {
        };

    }, [])

    const sendMessage = () => {
        const message = {
            username: `${state.currentUser.name} ${state.currentUser.lastName}`,
            userEmail:`${state.currentUser.email}`,
            message: value,
            time: Date.now(),
            channel: state.email?`${state.currentUser.email}:${state.email}`:state.group,
            reverseChannel: state.email?`${state.email}:${state.currentUser.email}`:'',
            event: "message"
        };
        socket.current.send(JSON.stringify(message));
        setValue('');
    };
    return (
        <div className={styles.messages}>
            {

                messages.map((item,index) => <div key={index}
                                          className={item.userEmail === state.currentUser.email ? styles.userMessageSelf : styles.userMessageFriend}>
                        {
                            // item.event === 'connection'
                            //     ? <div>Пользователь {item.username} подключился</div>
                            //     :

                            <div>{item.username}. {item.message}</div>

                        }
                    </div>
                )
            }

            <div className={styles.form}>
                <input className={styles.input} value={value} onChange={e => setValue(e.target.value)} type="text"
                       placeholder="Введите текст сообщения"/>
                <button className={styles.send} onClick={sendMessage}><img src={Send} alt="Отправить"/></button>
            </div>
        </div>
    );
};

export default Messages;