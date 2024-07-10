import React, {useContext, useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from "axios";
import {AuthContext} from "../context/AuthContext";

function SignUp() {
    const navigate = useNavigate();
    const [fetchingCompleted, setFetchingCompleted] = useState(false);
    const {state, Toggle} = useContext(AuthContext)

    async function SendInfo(e) {
        e.preventDefault();
        setFetchingCompleted(false);

        try {
            const response = await axios.post('http://localhost:3000/register',
                {
                    email: document.getElementById("email").value,
                    password: document.getElementById("password").value,
                    username: document.getElementById("username").value
                });
            if (state) {
                Toggle();
            }
            //localStorage.setItem('token', response.data.accessToken);
            navigate('/SignIn');
        } catch (e) {
            console.error(e);
        }
    }


    return (
    <>
      <h1>Registreren</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur atque consectetur, dolore eaque eligendi
        harum, numquam, placeat quisquam repellat rerum suscipit ullam vitae. A ab ad assumenda, consequuntur deserunt
        doloremque ea eveniet facere fuga illum in numquam quia reiciendis rem sequi tenetur veniam?</p>
        <form>
            <label htmlFor="username">Username:</label>
            <input type="text" name="username" id="username"/>
            <label htmlFor="email">Email:</label>
            <input type="email" name="email" id="email"/>
            <label htmlFor="password">Password:</label>
            <input type="password" name="password" id="password"/>
            <button type="button"
                 onClick={SendInfo}>Registreren
            </button>
        </form>
        <p>Heb je al een account? Je kunt je <Link to="/signin">hier</Link> inloggen.</p>
    </>
  );
}

export default SignUp;