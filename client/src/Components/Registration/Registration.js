import React, {useContext, useState} from 'react';
import {NavLink} from "react-router-dom";
import {Context} from "../../index";
import firebase from "firebase/compat";

const Registration = () => {
    const{auth}=useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [surname, setSurname] = useState("");
    const [error, setError] = useState("");


    const handlePassChange = (e) => {
        setPassword(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleNameChange = (e) => {
        setFirstname(e.target.value);
    };
    const handleFamilyChange = (e) => {
        setSurname(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await auth.createUserWithEmailAndPassword(email, password);
            await firebase.firestore().collection('/users').add({
                name: firstname,
                lastName: surname,
                email
            })

        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <React.Fragment>

            <div className="registration-block">
                <p>Чтобы зарегистрироваться, заполните поля формы</p>
                <form className="form" onSubmit={handleSubmit}>

                    <input
                        placeholder="Name" name="name" type="text"
                        onChange={handleNameChange} value={firstname}
                    />

                    <input
                        placeholder="Surname" name="surname" type="text"
                        onChange={handleFamilyChange} value={surname}
                    />
                    <input
                        placeholder="Email" name="email" type="email"
                        onChange={handleEmailChange} value={email}
                    />


                    <input
                        placeholder="Введите пароль" name="password" onChange={handlePassChange}
                        value={password} type="password"/>


                    {error && <p>{error}</p>}
                    <button type="submit">Зарегистрироваться</button>


                </form>
                <p>
                    Уже есть аккаунт? <NavLink to="/login">Вход</NavLink>
                </p>
            </div>
        </React.Fragment>
    );

};

export default Registration;