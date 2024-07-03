import React, {useContext, useState} from 'react';
import { Link } from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';

function SignIn() {
    let {stateChangeHandler, state, user} = useContext(AuthContext);
    const [email, setEmail] = useState("");

    function handleSignIn(user, userEmail, stateChangeHandler) {
        setEmail(userEmail);
        stateChangeHandler();
        user = userEmail;
    }

    return (
    <>
      <h1>Inloggen</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id molestias qui quo unde?</p>

        {!state && <>
            <form>
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" id="email"/>
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" id="password"/>
                <button type="button"
                        onClick={() => handleSignIn(user, document.getElementById("email").value, stateChangeHandler)}>Inloggen
                </button>
            </form>

            <p>Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.</p></>}


        {state && <p>Welkom {email}!</p>}
        </>
  );
}

export default SignIn;