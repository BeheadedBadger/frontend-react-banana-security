import React, {useContext, useState} from 'react';
import { Link } from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';
import axios from "axios";

function SignIn() {
    const {setUser, Toggle, getSecret, state, user} = useContext(AuthContext);

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/login', {
                email: document.getElementById("email").value,
                password: document.getElementById("password").value,
            });
            localStorage.setItem('token', response.data.accessToken);
        } catch (e) {
            console.error(e);
        }

        getSecret();
        setUser();
        Toggle();
    }

    return (
        <main>
            {!state &&<> <h1>Inloggen</h1>
            <form>
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" id="email"/>
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" id="password"/>
                <button type="button"
                        onClick={handleSubmit}>Inloggen
                </button>
            </form>
            <p>Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.</p>
            </>}
            {state && <h1>Welkom {user}</h1>}
        </main>
    );
}

export default SignIn;