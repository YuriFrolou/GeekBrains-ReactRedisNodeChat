import React, {useContext, useState} from 'react';
import {NavLink} from "react-router-dom";
import firebase from "firebase/compat";
import {Context} from "../../index";

const Login = () => {
    const{auth}=useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");


    const handlePassChange = (e) => {
        setPassword(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
           const {user}= await auth.signInWithEmailAndPassword(email, password);
            console.log(user.email)
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <React.Fragment>
            <div className="registration-block">
                <p>Чтобы войти, заполните поля формы</p>
                <form className="form" onSubmit={handleSubmit}>

                    <input
                        placeholder="Email" name="email" type="email"
                        onChange={handleEmailChange} value={email}
                    />


                    <input
                        placeholder="Введите пароль" name="password" onChange={handlePassChange}
                        value={password} type="password"/>


                    {error && <p>{error}</p>}
                    <button  type="submit">Войти</button>


                </form>
                <p>
                    Ещё нет аккаунта? <NavLink to="/registration">Регистрация</NavLink>
                </p>
            </div>
        </React.Fragment>
    );
};

export default Login;




